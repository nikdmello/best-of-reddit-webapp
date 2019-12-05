const express = require("express");
var app = express();
const request = require('request');

const port = process.env.PORT;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("search");
});

app.get("/results", (req, res) => {
  var subreddit = req.query.search; // search is name of text field
  var time = req.query.frequency;
  var url = 'https://old.reddit.com/r/' + subreddit + '/top/.json?sort=top&t=' + time;
  // var url = 'https://old.reddit.com/r/neu/top/.json?sort=top&t=year'
  request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var data = JSON.parse(body);
    res.render("results", {data: data}); //Renders results.ejs
  }
});
});

app.listen(port, () => {
  console.log(`running at port ${port}`);
});