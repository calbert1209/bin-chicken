import { forwardRef } from "preact/compat";
import { useState } from "preact/hooks";
import { JSXInternal } from "preact/src/jsx";
import { HiddenIcon, VisibleIcon } from "../../assets/icons";
import { IconButton } from "./IconButton";
import "./SecretInput.css";

export const SecretInput = forwardRef<
  HTMLInputElement,
  JSXInternal.HTMLAttributes<HTMLInputElement>
>((props, ref) => {
  const [hidden, setHidden] = useState(true);
  const Icon = hidden ? HiddenIcon : VisibleIcon;

  return (
    <form className="secret-input">
      <input {...props} ref={ref} type={hidden ? "password" : "text"} />
      <IconButton onClick={() => setHidden((s) => !s)}>
        <Icon />
      </IconButton>
    </form>
  );
});
