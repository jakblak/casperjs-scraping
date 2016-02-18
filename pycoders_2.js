/* http://pycoders.com/archive/
 *  - get date, name, link
 *  - generate HTML page with above in table format
 */
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

var fs = require('fs');
var url = 'http:/pycoders.com/archive';

var link = [];
var title = [];
var date = [];
var output = [];

function outputJSON() {
  output.push({
    link: link,
    title: title,
    date: date
  });
  return JSON.stringify(output);
};

function getLink() {
  var link = $('.campaign a');
  return _.map(link, function(e){
    return e.getAttribute('href');
  });
};

function getTitle() {
  var title = $('.campaign a');
  return _.map(title, function(e) {
    return e.innerHTML.replace(/\:.*$/g, '');
  });
};

function getDate() {
  var date = $('.campaign');
  return _.map(date, function(e) {
    return e.innerText.replace(/\-.*$/g, "");;
  });
};

casper.start(url, function() {
  // do something
});

casper.then(function() {
  link = this.evaluate(getLink);
});

casper.then(function() {
  title = this.evaluate(getTitle);
});

casper.then(function() {
  date = this.evaluate(getDate);
});

casper.run(function() {
  var data = outputJSON();
  fs.write('data.json', data, 'w');
  this.echo("\n Execution terminated").exit();
});