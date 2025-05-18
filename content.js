const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (localStorage.getItem("trackingEnabled") !== "true") return;

    mutation.addedNodes.forEach(node => {
      if (node.nodeType === 1 && node.innerText.includes("joined")) {
        logEvent(node.innerText, "joined");
      } else if (node.nodeType === 1 && node.innerText.includes("left")) {
        logEvent(node.innerText, "left");
      }
    });
  });
});

function logEvent(name, action) {
  const now = new Date();
  const log = `${name} ${action} at ${now.toLocaleTimeString()} on ${now.toLocaleDateString()}\n`;

  // Send to background to save
  chrome.runtime.sendMessage({ log });
}

window.onload = () => {
  const target = document.body;
  observer.observe(target, { childList: true, subtree: true });
};
