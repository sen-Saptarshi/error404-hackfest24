const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const { spawn } = require("child_process");

app.use((req, res, next) => {
  console.log("New request received:", Date.now());
  next();
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/translate", (req, res) => {
  let userInput = req.body.user;
  let code = req.body.code;
  const modelCode = ["eng_hing", "hing_eng", "eng_hing_ques", "hing_eng_ques"];
  const python = spawn("python", [`./translate_${modelCode[code]}.py`]);
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

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
