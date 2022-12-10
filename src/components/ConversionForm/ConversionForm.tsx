import { FC, useRef } from "react";
import { TextInputField, TextAreaField } from "./ConversionFormParts";

interface ConversionFormProps {
  id: string;
  legend: string;
  actionLabel: string;
  onSubmit?: (payload: ConversionPayload) => void;
}

export interface ConversionPayload {
  k: string | undefined;
  iv: string | undefined;
  text: string | undefined;
}

export const ConversionForm: FC<ConversionFormProps> = ({
  id,
  legend,
  actionLabel,
  onSubmit,
}) => {
  const kRef = useRef<HTMLInputElement>(null);
  const ivRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const handleOnSubmit = () =>
    onSubmit?.({
      k: kRef.current?.value,
      iv: ivRef.current?.value,
      text: textRef.current?.value,
    });

  return (
    <div className="form-body" id={id}>
      <fieldset>
        <legend>{legend}</legend>
        <TextInputField ref={kRef} label="k" id="key" />
        <TextInputField ref={ivRef} label="iv (hex)" id="iv" />
        <TextAreaField ref={textRef} id="plaintext" label="plain text" />
        <div className="form-row">
          <button onClick={handleOnSubmit}>{actionLabel}</button>
        </div>
      </fieldset>
    </div>
  );
};
