import { ComponentChildren } from "preact";
import { createPortal } from "preact/compat";
import "./PopoverLayer.css";

export function PopoverLayer({
  isOpen,
  backgroundColor = "#000000bb",
  blurBackdrop = false,
  children,
}: {
  isOpen: boolean;
  backgroundColor?: string;
  blurBackdrop?: boolean;
  children: ComponentChildren;
}) {
  const popoverLayer = document.getElementById("popover-layer");

  if (isOpen && popoverLayer) {
    return createPortal(
      <div
        className="popover-layer"
        style={{ backgroundColor }}
        data-blur={blurBackdrop}
      >
        {children}
      </div>,
      popoverLayer
    );
  }

  return null;
}
