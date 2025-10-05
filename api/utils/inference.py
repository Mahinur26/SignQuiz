import cv2
import numpy as np
import torch
import albumentations as A

from typing import List, Tuple, Dict
from src.utils.boxes import rescale_bboxes


# Match preprocessing used in src/realtime.py
_preproc = A.Compose([
    A.Resize(224, 224),
    A.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    A.ToTensorV2(),
])


def infer_from_jpeg_bytes(
    jpeg_bytes: bytes,
    model: torch.nn.Module,
    prob_thresh: float = 0.8,
) -> Tuple[List[Dict], Tuple[int, int]]:
    """Run model inference on a JPEG byte buffer.

    Returns (detections, (H, W)) where detections is a list of dicts with keys:
      - class_idx: int
      - score: float
      - bbox_xyxy: [x1, y1, x2, y2] in original image coordinates
    """

    # Decode JPEG -> BGR image
    buf = np.frombuffer(jpeg_bytes, dtype=np.uint8)
    bgr = cv2.imdecode(buf, cv2.IMREAD_COLOR)
    if bgr is None:
        raise ValueError("Failed to decode JPEG bytes")

    # Convert to RGB (training uses RGB)
    rgb = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)
    H, W = rgb.shape[:2]

    transformed = _preproc(image=rgb)
    x = transformed["image"].unsqueeze(0)  # (1,3,224,224)

    model_device = next(model.parameters()).device
    x = x.to(model_device, non_blocking=True)

    model.eval()
    with torch.inference_mode():
        out = model(x)

    # Drop "no object" class
    probs = out["pred_logits"].softmax(-1)[:, :, :-1]
    max_probs, max_classes = probs.max(-1)
    keep_mask = max_probs[0] > prob_thresh
    kept_idxs = torch.where(keep_mask)[0]

    # Move boxes to CPU before rescaling (utility builds CPU tensors)
    boxes_norm = out["pred_boxes"][0, kept_idxs].detach().cpu()
    boxes_xyxy = rescale_bboxes(boxes_norm, (W, H))  # tensor on CPU

    classes = max_classes[0, kept_idxs].detach().cpu()
    scores = max_probs[0, kept_idxs].detach().cpu()

    detections: List[Dict] = []
    for cls_idx, score, box in zip(classes, scores, boxes_xyxy):
        x1, y1, x2, y2 = box.tolist()
        detections.append({
            "class_idx": int(cls_idx.item()),
            "score": float(score.item()),
            "bbox_xyxy": [float(x1), float(y1), float(x2), float(y2)],
        })

    return detections, (H, W)


