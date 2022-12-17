import { forwardRef } from "preact/compat";

// interface InputProps extends ComponentPropsWithoutRef<"input"> {
//   label: string;
// }
interface InputProps {
  id: string;
  label: string;
  defaultValue?: string;
}

export const TextInputField = forwardRef<HTMLInputElement, InputProps>(
  function textInputField({ id, label, defaultValue }, ref) {
    return (
      <div className="form-row">
        <label htmlFor={id}>{label}</label>
        <input
          ref={ref}
          type="text"
          name={id}
          id={id}
          defaultValue={defaultValue}
        />
      </div>
    );
  }
);

interface TextAreaProps {
  id: string;
  label: string;
  defaultValue?: string;
}

export const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function textAreaField({ id, label, defaultValue }, ref) {
    return (
      <div className="form-row">
        <label htmlFor={id}>{label}</label>
        <textarea
          ref={ref}
          itemType="textarea"
          name={id}
          id={id}
          defaultValue={defaultValue}
        />
      </div>
    );
  }
);
