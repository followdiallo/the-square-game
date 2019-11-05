const express = require("express");
const app = express();
app.listen(3033, function() {
  console.log("The game is running on port 3033 :)");
});

app.use(express.static("public"));
app.get("/", function(req, res) {
  res.send("index.html");
});
