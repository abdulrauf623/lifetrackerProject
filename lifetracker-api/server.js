const express = require("express");
const morgan = require("morgan");
const app = express();

const authRouter = require("./routes/auth")

const cors = require("cors")

const port = 3001;

app.use(cors())
app.use(morgan("tiny"))
app.use(express.json())

app.use("/auth", authRouter)

app.get("/", (req, res, next) => {
  res.status(200).send("Hello World");
});

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
