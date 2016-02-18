var casper = require('casper').create();

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