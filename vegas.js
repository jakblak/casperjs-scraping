/****************************************************************
* grab the Hotels Name and Price
* print name and price to the console
* wait for selector load
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

var url = 'http://www.agoda.com/pages/agoda/default/DestinationSearchResult.aspx?asq=ltZUx7IfD1MB%2bs%2bu8Bt1hmj7ZRP%2bpD1u84J421cc6R03%2bcFzb6xGLBovamKsVJYWP%2bYvyfVoCCI0bWLvEE05O5ZVp7qCgHOhvppYs3FVemoFdsN26F3ZLT%2bRj5HmjqbkCpAzJy%2bIPcIhZIlXClDyym2c0wr1KhL%2fgrsEhZU%2b5Lgf7EIxDoTvxDSIG61j7TJX6ZxCORhL3RKFmdrXVbrcEbICjpP%2bZXhLJok%2f33DHkuHSVIog4XPXwMMI07nEqsJN&city=17072&tick=635910570980&sort=agodaRecommended';

var names = [];
var prices = [];

function getNames() {
  var names = $('[data-selenium=hotel-name]');
  return _.map(names, function(e){
    return e.innerHTML;
  });
};

function getPrices() {
  var prices = $('[data-selenium=display-price]');
  return _.map(prices, function(e) {
    return e.innerHTML;
  });
};

casper.start(url, function() {
  this.echo(this.getTitle());
});

casper.waitForSelector('.hotel-name', function() {
  console.log('hotel-name selector is loaded' );
});

casper.then(function() {
  this.clickLabel('Stars (5...1)', 'span');
  console.log('click to filter ratings');
});

casper.wait(1000, function() {
    this.echo("I've waited for a second.");
});

casper.then(function() {
  names = this.evaluate(getNames);
  // prices = this.evaluate(getPrices);
});
casper.then(function() {
  this.echo(names.length + ' names found: ');
  this.echo(' - ' + names.join('\n - '));
  // this.echo(' - ' + prices.join('\n - ')).exit();
});

casper.run()