import { JSXInternal } from "preact/src/jsx";
import { FilledIcon } from "./FilledIcon";
import "./IconButton.css";

export function IconButton({
  onClick,
  children,
}: JSXInternal.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button onClick={onClick} className="icon-button">
      <FilledIcon>{children}</FilledIcon>
    </button>
  );
}
