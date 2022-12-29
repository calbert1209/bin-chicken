import { ComponentChild } from "preact";
import "./FilledIcon.css";

interface IconProps {
  children: ComponentChild;
  color?: string;
}

export function FilledIcon({ children, color = "inherit" }: IconProps) {
  return (
    <div className="filled-icon" style={{ color }}>
      {children}
    </div>
  );
}
