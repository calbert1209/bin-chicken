// cspell:ignore qrcode
import qrcode from "qrcode-generator";

type TypeNumber = Parameters<typeof qrcode>[0];
type ErrorCorrectionLevel = Parameters<typeof qrcode>[1];

const TYPE: TypeNumber = 0;
const CORRECTION_LEVEL: ErrorCorrectionLevel = "M";

export function generateQRCodeDataUrl(content: string, size: number = 4) {
  const qr = qrcode(TYPE, CORRECTION_LEVEL);
  qr.addData(content);
  qr.make();
  return qr.createDataURL(size);
}

export function drawQRCode(context: CanvasRenderingContext2D, content: string) {
  const qr = qrcode(TYPE, CORRECTION_LEVEL);
  qr.addData(content);
  qr.make();
  qr.renderTo2dContext(context, 4);
}