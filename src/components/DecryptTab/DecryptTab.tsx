import { MutableRef, useRef, useState } from "preact/hooks";
import { decryptFromHex } from "../../service/AES-GCM";
import { Alert, AlertLevel } from "../common/Alert";
import { SecretInput } from "../common/SecretInput";
import "./DecryptTab.css";
const defaultPassword = "helloWorld";

interface CypherIv {
  cypher: string;
  iv: string;
}

const parseCypherIv = (text: string): CypherIv => {
  const [iv, cypher] = text.split(":");
  if (!iv || !cypher) throw Error("could not parse cypher or IV");

  return {
    cypher,
    iv,
  };
};

const getFormValues = (
  secretRef: MutableRef<HTMLInputElement | null>,
  cypherIvRef: MutableRef<HTMLTextAreaElement | null>
) => {
  const password = secretRef.current?.value;
  if (!password) {
    throw Error("invalid password");
  }

  const cypherIvText = cypherIvRef.current?.value;
  if (!cypherIvText) {
    throw Error("invalid cypherIv");
  }
  const { cypher, iv } = parseCypherIv(cypherIvText);
  return {
    password,
    cypher,
    iv,
  };
};

export function DecryptTab() {
  const [error, setError] = useState<Error | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const secretRef = useRef<HTMLInputElement | null>(null);
  const cypherIvRef = useRef<HTMLTextAreaElement | null>(null);

  const handleOnClickDecrypt = async () => {
    setError(null);
    setMsg(null);

    try {
      const { password, iv, cypher } = getFormValues(secretRef, cypherIvRef);

      const plaintext = await decryptFromHex(password, iv, cypher);
      if (import.meta.env.DEV) {
        console.log("decrypted: %s", plaintext);
      }

      await navigator.clipboard.writeText(plaintext);

      setMsg("Successfully decrypted and copied cypher text");
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    }
  };
  return (
    <div className="decrypt-tab">
      {error && (
        <Alert onClose={() => setError(null)} level={AlertLevel.Warning}>
          {`${error.name}: ${error.message}`}
        </Alert>
      )}
      {!error && msg && <Alert onClose={() => setMsg(null)}>{msg}</Alert>}
      <SecretInput
        className="decrypt-secret-input"
        ref={secretRef}
        defaultValue={defaultPassword}
        autoComplete="current-password"
      />
      <div>cypher + I.V.</div>
      <textarea ref={cypherIvRef} />
      <button onClick={handleOnClickDecrypt}>decrypt</button>
    </div>
  );
}
