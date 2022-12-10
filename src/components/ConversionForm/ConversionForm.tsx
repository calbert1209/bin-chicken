import { FC, useRef } from "react";
import { TextInputField, TextAreaField } from "./ConversionFormParts";

const IV_STRING = '63b0329eda143b6c0941689b2e6dd741';
const K_STRING = 'wMwM4ytpeIfw2KSueDiXnH3dbiaS0XBv3dTeh0RfvbY';

interface ConversionFormProps {
  id: string;
  legend: string;
  actionLabel: string;
  onSubmit?: (payload: Partial<ConversionPayload>) => void;
}

export interface ConversionPayload {
  k: string;
  iv: string;
  text: string;
}

export const isConversionPayload = (obj: Partial<ConversionPayload>): obj is ConversionPayload => {
  const keys: Array<keyof ConversionPayload> = [
    'k', 'iv', 'text'
  ];
  return keys.every((key) => !!obj[key])
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
        <TextInputField ref={kRef} label="k" id="key" defaultValue={K_STRING}/>
        <TextInputField ref={ivRef} label="iv (hex)" id="iv" defaultValue={IV_STRING} />
        <TextAreaField ref={textRef} id="plaintext" label="plain text" />
        <div className="form-row">
          <button onClick={handleOnSubmit}>{actionLabel}</button>
        </div>
      </fieldset>
    </div>
  );
};
