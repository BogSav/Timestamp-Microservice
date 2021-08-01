// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

const isValid = (d) => {
  return d instanceof Date && !isNaN(d);
}

app.get("/api/:date", (req, res) => {
  let dateParam = /\d{5,}/.test(req.params.date) ? Number(req.params.date) : req.params.date;

  let date = new Date(dateParam);

  if(!isValid(date))
    return res.json({error : "Invalid Date"});

  let utcStringDate = date.toUTCString();
  let unixStringDate = date.getTime();

  res.json({
    unix : unixStringDate,
    utc : utcStringDate
  });
});

app.get("/api", (req, res) => {
  let date = new Date();

  let utcStringDate = date.toUTCString();
  let unixStringDate = date.getTime();

  res.json({
    unix : unixStringDate,
    utc : utcStringDate
  });
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
