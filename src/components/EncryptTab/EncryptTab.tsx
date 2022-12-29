import { MutableRef, useRef, useState } from "preact/hooks";
import { encrypt2hex, generateIvHex } from "../../service/AES-GCM";
import { Alert, AlertLevel } from "../common/Alert";
import { SecretInput } from "../common/SecretInput";
import "./EncryptTab.css";

const password = "helloWorld";

const getFormValues = (
  secretRef: MutableRef<HTMLInputElement | null>,
  plainTextRef: MutableRef<HTMLTextAreaElement | null>
) => {
  const password = secretRef.current?.value;
  if (!password) {
    throw Error("invalid password");
  }

  const plainText = plainTextRef.current?.value;
  if (!plainText) {
    throw Error("invalid  plain text");
  }

  return {
    password,
    plainText,
  };
};

export function EncryptTab() {
  const [error, setError] = useState<Error | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const secretRef = useRef<HTMLInputElement | null>(null);
  const plainTextRef = useRef<HTMLTextAreaElement | null>(null);

  const handleOnClickEncrypt = async () => {
    setMsg(null);
    setError(null);

    try {
      const { password, plainText } = getFormValues(secretRef, plainTextRef);
      const iv = generateIvHex();
      const cypher = await encrypt2hex(password, iv, plainText);
      const cypherIv = `${iv}:${cypher}`;
      if (import.meta.env.DEV) {
        console.log("encrypted", cypherIv);
      }

      await navigator.clipboard.writeText(cypherIv);
      setMsg("Successfully generated and copied cypher text");
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
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
      {!error && msg && <Alert onClose={() => setMsg(null)}>{msg}</Alert>}
      <SecretInput
        className="encrypt-secret-input"
        ref={secretRef}
        defaultValue={password}
        autoComplete="current-password"
      />
      <div>plain text</div>
      <textarea ref={plainTextRef} defaultValue="I am not a cryptographer" />
      <button onClick={handleOnClickEncrypt}>encrypt</button>
    </div>
  );
}
