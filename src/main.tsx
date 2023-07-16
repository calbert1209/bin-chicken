import { render } from "preact";
import App from "./App";
import "./index.css";

render(<App />, document.getElementById("root")!);

if ("Worker" in window) {
  const worker = new Worker("./example.js");

  worker.addEventListener("message", (e) => {
    console.log(
      "%cmessage from worker: %d",
      "background-color: seagreen;color: white;",
      e.data
    );
  });

  // setInterval(() => {
  //   worker.postMessage("to-worker");
  // }, 1000);
}
