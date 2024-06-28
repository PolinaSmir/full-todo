const express = require("express");
const cors = require("cors");
const router = require("./routes/index");
const { errorHandler } = require("./errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/", router);

app.post("/example/counter", async (req, res, next) => {
  const {
    body: { counter },
  } = req;
  console.log("Zapyt");
  return res.status(200).send({ ServerResponse: counter });
});

app.use(errorHandler);

module.exports = app;
