const fs = require("fs");
const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.text());

app.post("/log", (req, res) => {
  const log = req.body;
  const logPath = path.join(__dirname, "data.txt");

  fs.appendFile(logPath, log, err => {
    if (err) {
      console.error("Error writing log:", err);
      return res.status(500).send("Failed to write");
    }
    console.log("Log saved:", log.trim());
    res.send("Logged");
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
