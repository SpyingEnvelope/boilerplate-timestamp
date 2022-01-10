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

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api", (req, res) => {
  const utcDate = new Date().toUTCString();
  const unixDate = Date.parse(utcDate);
  res.json({ unix: parseInt(unixDate), utc: utcDate });
})

app.get("/api/:date", function (req, res) {
  const testRegex = /[0-9]{5}/g
  if (testRegex.test(req.params.date)) {
    let unixDate = new Date(parseInt(req.params.date)).toUTCString();
    res.json({unix: parseInt(req.params.date), utc: unixDate});
  } else if (Number.isNaN(Date.parse(req.params.date))) {
    res.json({ error: 'Invalid Date'});
  } else {
    let unixDate = Date.parse(req.params.date)
    let utcDate = new Date(unixDate).toUTCString();
    res.json({ unix: parseInt(unixDate), utc: utcDate });
  };
  
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
