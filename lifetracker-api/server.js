const express = require("express");
const morgan = require("morgan");
const app = express();

const authRouter = require("./routes/auth")

const cors = require("cors")

const port = 3001;

app.use(cors())
app.use(morgan("tiny"))
app.use(express.json())

app.use("/author", authRouter)

app.get("/", (req, res, next) => {
  res.status(200).send("Hello World");
});


app.use((req, res, next) => {
  return next(new NotFoundError());
});

app.use((err, req, res, next) => {
  const status = err.status || 500;

  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
