const Square640VideoConstraints = {
  video: { width: { ideal: 1024 }, height: { ideal: 1024 } },
};

export class VideoStream {
  readonly width: number | undefined;
  readonly height: number | undefined;
  private constructor(readonly stream: MediaStream) {
    const [vtrack] = stream.getVideoTracks();
    const { width, height } = vtrack.getSettings();
    this.width = width;
    this.height = height;
  }

  stop() {
    this.stream.getTracks().forEach((t) => t.stop());
  }

  static async create(
    constraints: MediaStreamConstraints = Square640VideoConstraints
  ): Promise<VideoStream> {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    return new VideoStream(stream);
  }
}
