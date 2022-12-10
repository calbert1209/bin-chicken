import { useState } from "react";
// import reactLogo from "./assets/react.svg";
import "./App.css";
import {
  ConversionForm,
  ConversionPayload,
} from "./components/ConversionForm/ConversionForm";
import { ConversionOutputDisplay } from "./components/ConversionOutputDisplay/ConversionOutputDisplay";

function App() {
  const [convertedValue, setConvertedValue] = useState(
    "I am not a cryptographer"
  );
  const [error, setError] = useState<Error | null>(null);

  const handleOnSubmitEncrypt = (args: ConversionPayload) => {
    setConvertedValue(JSON.stringify(args));
    setError(null);
  };

  const handleOnSubmitDecrypt = () => {
    setError(new Error("FAKE: something went wrong"));
  };

  return (
    <div className="App">
      <div className="columns">
        <ConversionForm
          id="encrypt"
          legend="encrypt"
          actionLabel="encrypt →"
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
          onSubmit={handleOnSubmitDecrypt}
        />
      </div>
    </div>
  );
}

export default App;
