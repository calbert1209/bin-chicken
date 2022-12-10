import { forwardRef } from "react";

interface CommonProps {
  id: string;
  label: string;
}

export const TextInputField = forwardRef<HTMLInputElement, CommonProps>(
  function textInputField({ id, label }, ref) {
    return (
      <div className="form-row">
        <label htmlFor={id}>{label}</label>
        <input ref={ref} type="text" name={id} id={id} />
      </div>
    );
  }
);

export const TextAreaField = forwardRef<HTMLTextAreaElement, CommonProps>(
  function textAreaField({ id, label }, ref) {
    return (
      <div className="form-row">
        <label htmlFor={id}>{label}</label>
        <textarea ref={ref} itemType="textarea" name={id} id={id} required />
      </div>
    );
  }
);
