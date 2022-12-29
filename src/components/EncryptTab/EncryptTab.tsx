import { useRef, useState } from "preact/hooks";
import { encrypt2hex, generateIvHex } from "../../service/AES-GCM";
import { Alert, AlertLevel } from "../common/Alert";
import { SecretInput } from "../common/SecretInput";
import "./EncryptTab.css";

const password = "helloWorld";
const example = {
  iv: "63b0329eda143b6c0941689b2e6dd741",
  cypher:
    "e54cd8a481b9eb36b803564ef145e49b90f730cb50d732d7aa440d3ae19b2281aaa38b42f027cc50",
};

export function EncryptTab() {
  const [error, setError] = useState<Error | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const secretRef = useRef<HTMLInputElement | null>(null);
  const plaintextRef = useRef<HTMLTextAreaElement | null>(null);

  const handleOnClickEncrypt = () => {
    setMsg(null);
    setError(null);
    // todo check inputs
    const iv = generateIvHex();
    encrypt2hex(secretRef.current!.value, iv, plaintextRef.current!.value)
      .then((cypher) => {
        const cypherIv = {
          iv,
          cypher,
        };
        console.log("encrypted", cypherIv);

        return navigator.clipboard.writeText(`${iv}:${cypher}`);
      })
      .then(() => {
        setMsg("cypher text successfully generated");
      })
      .catch(setError);
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
      <textarea ref={plaintextRef} defaultValue="I am not a cryptographer" />
      <button onClick={handleOnClickEncrypt}>encrypt</button>
    </div>
  );
}

/**
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
 */
