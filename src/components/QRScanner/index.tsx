import { useMemo, useRef, useState } from "preact/hooks";
import { CameraMediaStream, Detector } from "./qrScanner";
import { Show } from "../common/Show";
import "./index.css";
import { AddQRCodeIcon } from "../../assets/icons";

type ScannerStatus = "initial" | "starting" | "started";

type QRScannerProps = {
  onResult: (result: string) => void;
  onError: (error: unknown) => void;
};

export const QRScanner = ({ onResult, onError }: QRScannerProps) => {
  const [status, setStatus] = useState<ScannerStatus>("initial");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const detector = useMemo(() => new Detector(), []);
  const cameraStream = useMemo(() => new CameraMediaStream(), []);

  const handleResult = (result: string) => {
    onResult(result);
    handleStop();
  };

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
      onError(error);
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
        <button className="qrScanner__startCamera" onClick={handleStart}>
          <AddQRCodeIcon />
        </button>
      </Show>
      <Show when={status === "starting"}>
        <div className="qrScanner__loading">
          <p>starting camera...</p>
        </div>
      </Show>
      <video
        ref={videoRef}
        class="qrScanner__video"
        style={{
          display: status === "started" ? "block" : "none",
        }}
        autoPlay
      ></video>
      <Show when={status === "started"}>
        <button className="qrScanner__stopCamera" onClick={handleStop}>
          stop
        </button>
      </Show>
    </>
  );
};
