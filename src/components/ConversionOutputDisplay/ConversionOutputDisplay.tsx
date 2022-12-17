/// <reference types="vite-plugin-svgr/client" />
import { FunctionComponent as FC } from "preact";
import { ReactComponent as CopyIcon } from "../../assets/copy-icon.svg";

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
        <CopyIcon />
      </button>
    </div>
  );
};
