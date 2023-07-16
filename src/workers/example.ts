function randomNumber() {
  return Math.floor(Math.random() * 1000);
}

self.addEventListener("message", (e) => {
  postMessage(randomNumber());
});
