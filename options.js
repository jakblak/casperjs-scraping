var casper = require("casper").create({
  verbose: true,
  logLevel: 'debug',     // debug, info, warning, error
  pageSettings: {
    loadImages: false,
    loadPlugins: false,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
  },
  clientScripts: ["/vendor/jquery.min.js"]
});

casper.start('http://en.wikipedia.org/', function() {
  this.echo(this.getTitle());
});

casper.then(function() {
  this.echo(this.getCurrentUrl());
});

casper.run(function() {
  this.echo('Done').exit();
});

// casper.run();