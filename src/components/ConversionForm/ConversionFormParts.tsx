import { ComponentPropsWithoutRef, forwardRef } from "react";

// interface CommonProps {
//   id: string;
//   label: string;
//   defaultValue?:
// }
interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label: string;
}

export const TextInputField = forwardRef<HTMLInputElement, InputProps>(
  function textInputField({ id, label, defaultValue }, ref) {
    return (
      <div className="form-row">
        <label htmlFor={id}>{label}</label>
        <input ref={ref} type="text" name={id} id={id} defaultValue={defaultValue} />
      </div>
    );
  }
);

interface TextAreaProps extends ComponentPropsWithoutRef<'textarea'> {
  label: string;
}

export const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function textAreaField({ id, label, defaultValue }, ref) {
    return (
      <div className="form-row">
        <label htmlFor={id}>{label}</label>
        <textarea ref={ref} itemType="textarea" name={id} id={id} defaultValue={defaultValue} />
      </div>
    );
  }
);
