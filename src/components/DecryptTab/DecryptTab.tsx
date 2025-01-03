import { MutableRef, useRef, useState } from "preact/hooks";
import { decryptFromHex } from "../../service/AES-GCM";
import { Alert, AlertLevel } from "../common/Alert";
import { SecretInput } from "../common/SecretInput";
import "./DecryptTab.css";
import { QRScanner } from "../QRScanner";
import { Show } from "../common/Show";

type CipherIv = {
  cipher: string;
  iv: string;
};

const parseCipherIv = (text: string): CipherIv => {
  const [iv, cipher] = text.split(":");
  if (!iv || !cipher) throw Error("could not parse cipher or IV");

  return {
    cipher,
    iv,
  };
};

const getFormValues = (
  secretRef: MutableRef<HTMLInputElement | null>,
  cipherIvRef: MutableRef<HTMLTextAreaElement | null>
) => {
  const password = secretRef.current?.value;
  if (!password) {
    throw Error("invalid password");
  }

  const CipherIvText = cipherIvRef.current?.value;
  if (!CipherIvText) {
    throw Error("invalid CipherIv");
  }
  const { cipher, iv } = parseCipherIv(CipherIvText);
  return {
    password,
    cipher,
    iv,
  };
};

export function DecryptTab() {
  const [error, setError] = useState<Error | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [plainText, setPlainText] = useState<string | null>(null);
  const [cipherTextHead, setCipherTextHead] = useState<string | null>(null);

  const secretRef = useRef<HTMLInputElement | null>(null);
  const CipherIvRef = useRef<HTMLTextAreaElement | null>(null);

  const handleOnClickDecrypt = async () => {
    setError(null);
    setMsg(null);

    try {
      const { password, iv, cipher } = getFormValues(secretRef, CipherIvRef);

      const plaintext = await decryptFromHex(password, iv, cipher);
      if (import.meta.env.DEV) {
        console.log("decrypted: %s", plaintext);
      }

      await navigator.clipboard.writeText(plaintext);

      setPlainText(plaintext);
      setCipherTextHead(iv.slice(0, 8));

      setMsg("Successfully decrypted and copied cipher text");
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    }
  };

  const handleScannerResult = (result: string) => {
    CipherIvRef.current!.value = result;
  };

  console.log(error);

  return (
    <div className="decrypt-tab">
      {error ? (
        <Alert onClose={() => setError(null)} level={AlertLevel.Warning}>
          {`${error.name}: ${error.message}`}
        </Alert>
      ) : null}
      {!error && msg && <Alert onClose={() => setMsg(null)}>{msg}</Alert>}
      <div className="decrypt-label">password</div>
      <SecretInput
        className="decrypt-secret-input"
        ref={secretRef}
        autoComplete="current-password"
      />
      <div className="decrypt-label">cipher + IV</div>
      <textarea ref={CipherIvRef} className="decrypt-cipher-iv" />
      <button className="decrypt-btn" onClick={handleOnClickDecrypt}>
        decrypt
      </button>
      <QRScanner
        onResult={handleScannerResult}
        onError={(error) => (error instanceof Error ? setError(error) : null)}
      />
      <Show when={plainText !== null}>
        <details>
          <summary>
            <code class="cipherTextHead">{cipherTextHead}</code>
          </summary>
          <div class="plainTextPreview">{plainText}</div>
        </details>
      </Show>
    </div>
  );
}
