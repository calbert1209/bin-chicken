import { MutableRef, useRef, useState } from "preact/hooks";
import { encrypt2hex, generateIvHex } from "../../service/AES-GCM";
import { Alert, AlertLevel } from "../common/Alert";
import { SecretInput } from "../common/SecretInput";
import "./EncryptTab.css";
import { generateQRCodeDataUrl } from "../../service/qr-code";
import { HashSample } from "../common/CodeSample";
import { Show } from "../common/Show";

const getFormValues = (
  secretRef: MutableRef<HTMLInputElement | null>,
  plainTextRef: MutableRef<HTMLTextAreaElement | null>
) => {
  const password = secretRef.current?.value;
  if (!password || password.length < 6) {
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
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [cipherSample, setCipherSample] = useState<string | null>(null);
  const secretRef = useRef<HTMLInputElement | null>(null);
  const plainTextRef = useRef<HTMLTextAreaElement | null>(null);

  const handleOnClickEncrypt = async () => {
    setMsg(null);
    setError(null);

    try {
      const { password, plainText } = getFormValues(secretRef, plainTextRef);
      const iv = generateIvHex();
      const cipher = await encrypt2hex(password, iv, plainText);
      const cipherIv = `${iv}:${cipher}`;
      if (import.meta.env.DEV) {
        console.log("encrypted", cipherIv);
      }

      await navigator.clipboard.writeText(cipherIv);

      const cipherIvHead = cipherIv.slice(0, 8);
      setMsg(
        `Successfully generated and copied cipher text. ${cipherIvHead}...`
      );

      setDataUrl(generateQRCodeDataUrl(cipherIv, 4));
      setCipherSample(cipherIvHead);
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
      <div className="encrypt-label">password</div>
      <SecretInput
        className="encrypt-secret-input"
        ref={secretRef}
        autoComplete="current-password"
      />
      <div className="encrypt-label">plain text</div>
      <textarea
        className="encrypt-plaintext"
        ref={plainTextRef}
        defaultValue="I am not a cryptographer"
      />
      <button className="encrypt-btn" onClick={handleOnClickEncrypt}>
        encrypt
      </button>
      <Show when={dataUrl !== null}>
        <div className="encrypt-result-column">
          <img
            className="cipherIv-QrCode"
            src={dataUrl as string}
            alt="QR code"
          />
        </div>
      </Show>
      <Show when={cipherSample !== null}>
        <div className="encrypt-result-column">
          <HashSample content={cipherSample as string} />
        </div>
      </Show>
    </div>
  );
}
