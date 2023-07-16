import { useEffect, useRef, useState } from "preact/hooks";
import { VideoStream } from "../../service/MediaStream";

interface Props {
  onClose: () => void;
}

export function QRScanner({ onClose }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);

  const [stream, setStream] = useState<VideoStream | null>(null);

  useEffect(() => {
    VideoStream.create()
      .then((videoStream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = videoStream.stream;
        }
        setStream(videoStream);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!stream) return;

    const { width, height } = stream;
    if (width == undefined || height == undefined) return;

    setInterval(() => {
      if (!videoRef.current) return;
      if (!photoRef.current) return;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(videoRef.current, 0, 0, width, height);
      const dataURL = canvas.toDataURL("image/png");
      photoRef.current.src = dataURL;
    }, 2000);
  }, [stream]);

  const handleOnClose = () => {
    stream?.stop();
    setStream(null);
    onClose();
  };

  return (
    <>
      <h1 style={{ color: "white" }}>QR Scanner</h1>
      <button onClick={handleOnClose}>X</button>
      <video
        ref={videoRef}
        autoPlay
        style={{ width: "200px", height: "200px" }}
      />
      <img
        ref={photoRef}
        style={{
          width: "200px",
          height: "200px",
        }}
      />
    </>
  );
}
