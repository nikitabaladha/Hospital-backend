const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

app.use(cors());

app.use(morgan("dev"));
app.use(bodyParser.json());

app.get("/api", (req, res) => {
  res.send("Hello Nikita");
});

const routes = require("./routes")(app);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
