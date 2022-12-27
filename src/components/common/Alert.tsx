import { ComponentChildren } from "preact";
import { JSXInternal } from "preact/src/jsx";
import { CloseIcon } from "../../assets/icons";
import "./Alert.css";
import { IconButton } from "./IconButton";

export enum AlertLevel {
  Info = "info",
  Warning = "warning",
}

interface AlertProps {
  onClose: JSXInternal.MouseEventHandler<HTMLButtonElement>;
  level?: AlertLevel;
  children: ComponentChildren;
}

export function Alert({
  children,
  onClose,
  level = AlertLevel.Info,
}: AlertProps) {
  return (
    <div className="common-alert" data-level={level}>
      <div>{children}</div>
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </div>
  );
}
