const express = require("express");
const app = express();
require("dotenv").config();

const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/hello", (req, res) => {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", (req, res) => {
  let inputDate = req.params.date;

  if (!inputDate) {
    const currentTime = new Date();
    return res.json({
      unix: currentTime.getTime(),
      utc: currentTime.toUTCString(),
    });
  }

  if (!isNaN(inputDate)) {
    inputDate = parseInt(inputDate);
  }

  const dateObject = new Date(inputDate);

  if (isNaN(dateObject.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  res.json({ unix: dateObject.getTime(), utc: dateObject.toUTCString() });
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
