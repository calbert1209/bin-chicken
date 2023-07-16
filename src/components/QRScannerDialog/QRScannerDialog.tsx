import { PopoverLayer } from "../common/PopoverLayer";
import { QRScanner } from "../QRScanner/QRScanner";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function QRScannerDialog({ isOpen, onClose }: Props) {
  return (
    <PopoverLayer isOpen={isOpen} backgroundColor={"#000000e0"} blurBackdrop>
      <QRScanner onClose={onClose} />
    </PopoverLayer>
  );
}
