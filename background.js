chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.log) {
    fetch("http://localhost:3000/log", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: message.log
    });
  }
});
