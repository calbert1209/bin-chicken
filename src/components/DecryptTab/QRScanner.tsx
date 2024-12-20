import { useMemo, useRef, useState } from "preact/hooks";
import { CameraMediaStream, Detector } from "./qrScanner";
import { Show } from "../common/Show";

type ScannerStatus = "initial" | "starting" | "started";

type QRScannerProps = {
  onResult: (result: string) => void;
}

export const QRScanner = ({onResult}: QRScannerProps) => {
  const [status, setStatus] = useState<ScannerStatus>("initial");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const detector = useMemo(() => new Detector(), []);
  const cameraStream = useMemo(() => new CameraMediaStream(), []);

  const handleResult = (result: string) => {
    onResult(result);
    handleStop();
  }

  const handleStart = async () => {
    setStatus("starting");

    try {
      await cameraStream.start(videoRef.current!);
      setStatus("started");
      detector.startScanning(videoRef.current!, handleResult);
    } catch (error: unknown) {
      console.error(error);
        setStatus("initial");
        handleStop();
    }
  };

  const handleStop = () => {
    detector.stopScanning();
    if (!videoRef.current) return;

    videoRef.current.pause();
    cameraStream.stop();
    videoRef.current.srcObject = null;
    setStatus("initial");
  };

  return (
    <>
      <Show when={status === "initial"}>
        <button
          style={{
            width: "100%",
            aspectRatio: "1/1",
            display: "flex",
            justifyContent: "center",
          }}
          onClick={handleStart}
        >
          start camera
        </button>
      </Show>
      <Show when={status === "starting"}>
        <p>starting camera...</p>
      </Show>
      <video
        ref={videoRef}
        style={{
          width: "100%",
          aspectRatio: "1/1",
          display: status === "started" ? "block" : "none",
          filter: "grayscale(1)",
        }}
        autoPlay
      ></video>
      <Show when={status === "started"}>
        <button onClick={handleStop}>stop</button>
      </Show>
    </>
  );
};
