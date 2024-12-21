
export class CameraMediaStream {
  private stream: MediaStream | null = null;

  async start(video: HTMLVideoElement) {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "environment",
        width: {
          ideal: 640,
          max: 640,
        },
        height: {
          ideal: 640,
          max: 640,
        },
      },
    });
    this.stream = stream;
    video.srcObject = stream;
  }

  stop() {
    if (!this.stream) return;

    this.stream.getTracks().forEach((track) => track.stop());
    this.stream = null;
  }
}

export class Detector {
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
      try {
        const result = await this.detect(video);
        if (result) {
          onResult(result.rawValue);
        }
      } catch (error: unknown) {
        console.error(error);
        window.clearInterval(this.timer);
      }
    }, 1000);
  }

  stopScanning() {
    window.clearInterval(this.timer);
  }
}