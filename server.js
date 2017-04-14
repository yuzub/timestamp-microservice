var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/:ts', function(req, res) {
  var ts = req.params.ts;
  var tsDate, unixTime, naturalTime;

  if (!isNaN(parseFloat(ts)) && isFinite(ts)) {
    tsDate = new Date(+ts * 1000);
  }
  else {
    tsDate = new Date(ts);
  }

  var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  unixTime = tsDate.valueOf() / 1000;
  if (unixTime) {
    naturalTime = monthNames[tsDate.getUTCMonth()] + ' ' + tsDate.getUTCDate() + ', ' + tsDate.getUTCFullYear();
  }
  else {
    naturalTime = null;
  }

  res.json({
    "unix": unixTime,
    "natural": naturalTime
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port ', app.get('port'));
});

/*The actual range of times supported by ECMAScript Date objects is slightly smaller: exactly –100,000,000 days to 100,000,000 days measured relative to midnight at the beginning of 01 January, 1970 UTC. 
This gives a range of 8,640,000,000,000,000 milliseconds to either side of 01 January, 1970 UTC.

The exact moment of midnight at the beginning of 01 January, 1970 UTC is represented by the value +0.
The third paragraph being the most relevant. Based on that paragraph, we can get the precise earliest date per spec from new Date(-8640000000000000), 
which is Tuesday, April 20th, 271,821 BCE (BCE = Before Common Era, e.g., the year -271,821).*/
