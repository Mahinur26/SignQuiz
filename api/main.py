from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import asyncio
import base64
import json
from typing import Any, Dict

import torch

from src.model import DETR
from src.utils.setup import get_classes
from api.utils import infer_from_jpeg_bytes


app = FastAPI(title="SignQuiz API", version="0.1.0")


# Global state
model: DETR | None = None
CLASSES: list[str] | None = None


@app.on_event("startup")
def load_resources():
    global model, CLASSES
    # Load model
    model = DETR(num_classes=3)
    model.eval()
    model.load_pretrained('pretrained/4426_model.pt')
    # Move to CUDA if available
    if torch.cuda.is_available():
        model = model.to('cuda')
    # Load classes
    CLASSES = get_classes()


@app.get("/")
def read_root():
    return {"status": "ok"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}


@app.websocket("/ws")
async def ws_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            message = await websocket.receive_text()
            try:
                payload: Dict[str, Any] = json.loads(message)
                if payload.get("type") != "frame":
                    await websocket.send_text(json.dumps({"type": "error", "message": "invalid type"}))
                    continue

                data_url: str = payload.get("data", "")
                if not data_url:
                    await websocket.send_text(json.dumps({"type": "error", "message": "no data"}))
                    continue

                # Strip data URL prefix
                if "," in data_url:
                    base64_str = data_url.split(",", 1)[1]
                else:
                    base64_str = data_url

                jpeg_bytes = base64.b64decode(base64_str)

                detections, (H, W) = infer_from_jpeg_bytes(jpeg_bytes, model)

                # Map class indices to names
                results = []
                for det in detections:
                    cls_idx = det["class_idx"]
                    cls_name = CLASSES[cls_idx] if isinstance(CLASSES, list) and 0 <= cls_idx < len(CLASSES) else str(cls_idx)
                    results.append({
                        "class": cls_name,
                        "class_idx": cls_idx,
                        "score": det["score"],
                        "bbox_xyxy": det["bbox_xyxy"],
                    })

                await websocket.send_text(json.dumps({
                    "type": "detections",
                    "size": {"w": W, "h": H},
                    "detections": results,
                }))
            except Exception:
                await websocket.send_text(json.dumps({"type": "error", "message": "bad frame"}))
    except WebSocketDisconnect:
        return


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("api.main:app", host="0.0.0.0", port=8000, reload=True)


