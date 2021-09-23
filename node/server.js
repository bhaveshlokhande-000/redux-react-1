const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.get("/", (req, res) => {
  return res.send("running");
});

app.use("/api/v1/article", require("./routes/api/v1/article"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
