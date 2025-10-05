import { useEffect, useRef } from "react";

const VideoFeed = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const socketRef = useRef(null);
  const lastSentRef = useRef(0);
  const targetFPS = 30;

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { frameRate: { ideal: 30, max: 30 } } })
      .then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream;

        socketRef.current = new WebSocket("ws://localhost:5000/ws");

        const sendFrame = (time) => {
          const now = performance.now();
          const elapsed = now - lastSentRef.current;
          const interval = 1000 / targetFPS;

          if (elapsed > interval && socketRef.current.readyState === WebSocket.OPEN) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");

            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL("image/jpeg", 0.8); // quality 0–1
          
            
            socketRef.current.send(JSON.stringify({
              type: "frame",
              data: dataUrl
            }));

            lastSentRef.current = now;
          }

          requestAnimationFrame(sendFrame);
        };

        requestAnimationFrame(sendFrame);
      })
      .catch((err) => console.error("Error accessing webcam:", err));

    return () => {
      if (socketRef.current) socketRef.current.close();
    };
  }, []);

  return (
    <div className="glassy rounded-lg w-full h-full p-4 flex flex-col items-center justify-center">
      <video ref={videoRef} autoPlay playsInline muted className="object-cover w-full h-full rounded-md" />
      <canvas ref={canvasRef} width={320} height={240} style={{ display: "none" }} />
    </div>
  );
};

export default VideoFeed;
