import { FC } from "react";

export const ConversionOutputDisplay: FC<{
  value: string;
  status: "result" | "error";
}> = ({ value, status }) => (
  <div>
    <div id="output" data-status={status}>
      {value}
    </div>
  </div>
);
