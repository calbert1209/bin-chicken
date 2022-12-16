import { FC } from "react";

export const ConversionOutputDisplay: FC<{
  value: string;
  status: "result" | "error";
}> = ({ value, status }) => {
  const handleOnClickCopy = () => navigator.clipboard.writeText(value);

  return (
    <div id="output-display">
      <div id="output" data-status={status}>
        {value}
      </div>
      <button id="copy-button" onClick={handleOnClickCopy}>
        copy
      </button>
    </div>
  );
};
