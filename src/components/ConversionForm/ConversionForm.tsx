import { useRef } from "preact/hooks";
import { FunctionComponent as FC } from "preact";
import { TextInputField, TextAreaField } from "./ConversionFormParts";

const IV_STRING = "63b0329eda143b6c0941689b2e6dd741";
const K_STRING = "wMwM4ytpeIfw2KSueDiXnH3dbiaS0XBv3dTeh0RfvbY";

interface ConversionFormProps {
  id: string;
  legend: string;
  actionLabel: string;
  textAreaLabel: string;
  onSubmit?: (payload: Partial<ConversionPayload>) => void;
}

export interface ConversionPayload {
  password: string;
  iv: string;
  text: string;
}

export const isConversionPayload = (
  obj: Partial<ConversionPayload>
): obj is ConversionPayload => {
  const keys: Array<keyof ConversionPayload> = ["password", "iv", "text"];
  return keys.every((key) => !!obj[key]);
};

export const ConversionForm: FC<ConversionFormProps> = ({
  id,
  legend,
  actionLabel,
  textAreaLabel,
  onSubmit,
}) => {
  const passwordRef = useRef<HTMLInputElement>(null);
  const ivRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const handleOnSubmit = () =>
    onSubmit?.({
      password: passwordRef.current?.value,
      iv: ivRef.current?.value,
      text: textRef.current?.value,
    });

  return (
    <div className="form-body" id={id}>
      <fieldset>
        <legend>{legend}</legend>
        <TextInputField
          ref={passwordRef}
          label="password"
          id="password"
          defaultValue={K_STRING}
        />
        <TextInputField
          ref={ivRef}
          label="iv (hex)"
          id="iv"
          defaultValue={IV_STRING}
        />
        <TextAreaField ref={textRef} id="plaintext" label={textAreaLabel} />
        <div className="form-row">
          <button onClick={handleOnSubmit}>{actionLabel}</button>
        </div>
      </fieldset>
    </div>
  );
};
