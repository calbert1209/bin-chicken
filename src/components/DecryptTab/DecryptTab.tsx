import { useRef, useState } from "preact/hooks";
import { decryptFromHex } from "../../service/AES-GCM";
import { Alert, AlertLevel } from "../common/Alert";
import { SecretInput } from "../common/SecretInput";
import "./DecryptTab.css";
const defaultPassword = "helloWorld";

interface CypherIv {
  cypher: string;
  iv: string;
}

const isCypherIv = (x: any): x is CypherIv => {
  return (
    "cypher" in x &&
    typeof x?.cypher === "string" &&
    "iv" in x &&
    typeof x?.iv === "string"
  );
};

const parseCypherIv = (text: string) => {
  const cypherIv = JSON.parse(text);
  if (!isCypherIv(cypherIv)) {
    throw new Error("could not parse input as CypherIv");
  }
  return cypherIv;
};

const decryptParsedValues = async (
  password: string,
  serialCypherIv: string
) => {
  try {
    const { cypher, iv } = parseCypherIv(serialCypherIv);
    return await decryptFromHex(password, iv, cypher);
  } catch (error) {
    throw error;
  }
};

export function DecryptTab() {
  const [error, setError] = useState<Error | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const secretRef = useRef<HTMLInputElement | null>(null);
  const cypherIvRef = useRef<HTMLTextAreaElement | null>(null);

  const handleOnClickDecrypt = () => {
    setError(null);
    setMsg(null);
    // todo: validate inputs
    const password = secretRef.current!.value;
    decryptParsedValues(password, cypherIvRef.current!.value)
      .then((plaintext) => {
        if (import.meta.env.DEV) {
          console.log("decrypted: %s", plaintext);
        }
        return navigator.clipboard.writeText(plaintext);
      })
      .then(() => {
        setMsg("Successfully decrypted cypher text");
      })
      .catch(setError);
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
