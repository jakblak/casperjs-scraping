/****************************************************************
* get room names
* change price to GBP
* print room names and prices to the console
*****************************************************************/

var casper = require("casper").create({
  verbose: true,
  logLevel: 'debug',     // debug, info, warning, error
  pageSettings: {
    loadImages: false,
    loadPlugins: false,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
  },
  clientScripts: ["vendor/jquery.min.js", "vendor/lodash.js"]
});

var url = 'http://www.agoda.com/the-cosmopolitan-of-las-vegas-autograph-collection-hotel/hotel/las-vegas-nv-us.html?checkin=2016-06-01&los=7&adults=2&rooms=1&cid=-1';

var rooms = [];
var prices = [];

function getRooms() {
  var rooms = $('.room-name span');
  return _.map(rooms, function(e){
    return e.innerHTML;
  });
};

function getPrices() {
  var prices = $('[data-selenium=price-sell]');
  return _.map(prices, function(e) {
    return e.innerHTML;
  });
};

casper.start(url, function() {
  this.echo(this.getTitle());
});

casper.then(function() {
  //change options
  this.click('select[id="currency-options"]');
});

casper.then(function() {
  //change value
  this.click('option[value="SAR"]');
});

casper.wait(1000, function() {
  console.log('waited 1 second');
});

casper.then(function() {
  rooms = this.evaluate(getRooms);
  prices = this.evaluate(getPrices);
});
casper.then(function() {
  this.echo(rooms.length + ' rooms found: ');
 // this.echo(' - ' + rooms.join('\n - '));
  this.echo(' - ' + prices.join('\n - ')).exit();
});

casper.run()