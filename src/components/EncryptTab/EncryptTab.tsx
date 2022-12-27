import { useRef, useState } from "preact/hooks";
import { JSXInternal } from "preact/src/jsx";
import { Alert, AlertLevel } from "../common/Alert";
import { SecretInput } from "../common/SecretInput";
import "./EncryptTab.css";

export function EncryptTab() {
  const [error, setError] = useState<Error | null>(null);
  const secretRef = useRef<HTMLInputElement | null>(null);
  const cypherIvRef = useRef<HTMLTextAreaElement | null>(null);

  const parseCypherIv = (value: string | undefined) => {
    if (!value) return null;

    try {
      setError(null);
      return JSON.parse(value);
    } catch (e) {
      if (e instanceof Error) {
        setError(e);
      }
    }
  };

  return (
    <div className="encrypt-tab">
      {error && (
        <Alert onClose={() => setError(null)} level={AlertLevel.Warning}>
          {error.message}
        </Alert>
      )}
      <SecretInput className="encrypt-secret-input" ref={secretRef} />
      <textarea ref={cypherIvRef} />
      <button
        onClick={() =>
          console.log("encrypt state", {
            secret: secretRef.current?.value,
            cypherIv: parseCypherIv(cypherIvRef.current?.value),
            error,
          })
        }
      >
        encrypt
      </button>
    </div>
  );
}
