import { useState } from "preact/hooks";
import { Alert, AlertLevel } from "../common/Alert";
import "./EncryptTab.css";

export function EncryptTab() {
  const [error, setError] = useState<Error | null>(null);
  return (
    <div className="encrypt-tab">
      {error && (
        <Alert onClose={() => setError(null)} level={AlertLevel.Warning}>
          {error.message}
        </Alert>
      )}
      <div>encrypt form contents</div>
    </div>
  );
}
