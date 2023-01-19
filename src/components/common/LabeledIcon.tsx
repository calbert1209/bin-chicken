import { ComponentChild } from "preact";
import { FilledIcon } from "./FilledIcon";
import "./LabeledIcon.css";

interface LabeledIconProps {
  label?: string;
  children: ComponentChild;
}

export function LabeledIcon({ label, children }: LabeledIconProps) {
  return (
    <div className="labeled-icon">
      {label && <div>{label}</div>}
      <FilledIcon>{children}</FilledIcon>
    </div>
  );
}
