const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const { spawn } = require("child_process");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/translate", (req, res) => {
  let userInput = req.body.user;
  const python = spawn("python", ["./translate.py"]);
  python.stdin.write(userInput.toString());
  python.stdin.end();

  let ans = "";
  python.stdout.on("data", (data) => {
    ans += data.toString();
  });
  python.on("close", (code) => {
    res.send(ans);
  });
});
app.listen(4000);
