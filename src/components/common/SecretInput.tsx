import { useState } from "preact/hooks";
import { JSXInternal } from "preact/src/jsx";
import { HiddenIcon, VisibleIcon } from "../../assets/icons";
import { IconButton } from "./IconButton";
import "./SecretInput.css";

export function SecretInput(
  props: JSXInternal.HTMLAttributes<HTMLInputElement>
) {
  const [hidden, setHidden] = useState(true);
  const Icon = hidden ? HiddenIcon : VisibleIcon;
  return (
    <div className="secret-input">
      <input {...props} type={hidden ? "password" : "text"} />
      <IconButton onClick={() => setHidden((s) => !s)}>
        <Icon />
      </IconButton>
    </div>
  );
}
