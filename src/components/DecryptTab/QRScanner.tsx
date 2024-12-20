import { ComponentChild, ComponentChildren } from "preact";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";

const Show = ({
  when,
  children,
}: {
  when: boolean;
  children: ComponentChild | ComponentChildren;
}) => {
  return when ? <>{children}</> : null;
};

async function startScanner(video: HTMLVideoElement) {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: "environment",
      width: {
        ideal: 640,
        max: 640
      },
      height: {
        ideal: 640,
        max: 640
      }
    },
  });

  video.srcObject = stream;
  video.play();
}

class Detector {
  private detector: BarcodeDetector | null = null;
  private timer = -1;

  private async init() {
    const formats = await BarcodeDetector.getSupportedFormats();
    this.detector = new BarcodeDetector({ formats });
  }

  async detect(video: HTMLVideoElement) {
    if (!this.detector) {
      await this.init();
    }

    const [result] = await this.detector!.detect(video);
    return result;
  }

  startScanning(video: HTMLVideoElement, onResult: (rawValue: string) => void) {
    this.timer = window.setInterval(async () => {
      const result = await this.detect(video);
      if (result) {
        onResult(result.rawValue);
      }
    }, 1000);
  }

  stopScanning() {
    window.clearInterval(this.timer);
  }
}


type ScannerStatus = "initial" | "starting" | "started";

type QRScannerProps = {
  onResult: (result: string) => void;
}

export const QRScanner = ({onResult}: QRScannerProps) => {
  const [status, setStatus] = useState<ScannerStatus>("initial");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const detector = useMemo(() => new Detector(), []);

  const handleStart = async () => {
    setStatus("starting");

    try {
      await startScanner(videoRef.current!);
      setStatus("started");
      detector.startScanning(videoRef.current!, (rawValue) => {
        console.log(rawValue);
        onResult(rawValue);
        handleStop();
      });
    } catch (error: unknown) {
      console.error(error);
        setStatus("initial");
        detector.stopScanning();
    }
  };

  const handleStop = () => {
    detector.stopScanning();
    if (!videoRef.current) return;

    videoRef.current.pause();

    if (videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current!.srcObject = null;
      setStatus("initial");
    }
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
      ></video>
      <Show when={status === "started"}>
        <button onClick={handleStop}>stop</button>
      </Show>
    </>
  );
};
