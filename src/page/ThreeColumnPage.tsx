import { useState } from "preact/hooks";
import {
  ConversionForm,
  ConversionPayload,
  isConversionPayload,
} from "../components/ConversionForm/ConversionForm";
import { ConversionOutputDisplay } from "../components/ConversionOutputDisplay/ConversionOutputDisplay";
import { decryptFromHex, encrypt2hex } from "../service/AES-GCM";

function ThreeColumnPage() {
  const [convertedValue, setConvertedValue] = useState(
    "I am not a cryptographer"
  );
  const [error, setError] = useState<Error | null>(null);

  const handleOnSubmitEncrypt = (payload: Partial<ConversionPayload>) => {
    if (isConversionPayload(payload)) {
      const { password, iv, text } = payload;
      encrypt2hex(password, iv, text)
        .then((cipherText) => {
          setConvertedValue(cipherText);
          setError(null);
        })
        .catch((error) => {
          setError(error);
        });
    }
  };

  const handleOnSubmitDecrypt = (payload: Partial<ConversionPayload>) => {
    if (isConversionPayload(payload)) {
      const { password, iv, text } = payload;
      decryptFromHex(password, iv, text)
        .then((plainText) => {
          setConvertedValue(plainText);
          setError(null);
        })
        .catch((error) => {
          setError(error);
        });
    }
  };

  return (
    <div className="App">
      <h2>Bin Chicken</h2>
      <div className="columns">
        <ConversionForm
          id="encrypt"
          legend="encrypt"
          actionLabel="encrypt →"
          textAreaLabel="plain text"
          onSubmit={handleOnSubmitEncrypt}
        />
        <ConversionOutputDisplay
          value={error ? error.toString() : convertedValue}
          status={error ? "error" : "result"}
        />
        <ConversionForm
          id="decrypt"
          legend="decrypt"
          actionLabel="← decrypt"
          textAreaLabel="cipher text"
          onSubmit={handleOnSubmitDecrypt}
        />
      </div>
    </div>
  );
}

export default ThreeColumnPage;
