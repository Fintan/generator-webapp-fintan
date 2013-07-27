'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var RiaGenerator = module.exports = function RiaGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    console.log('All done, now npm install ...');
    //this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(RiaGenerator, yeoman.generators.Base);

RiaGenerator.prototype.askFor = function askFor() {
  var cb = this.async();
  cb();
  /*var prompts = [{
    name: 'appName',
    message: 'What name do you want to give to your web app?',
  }];

  this.prompt(prompts, function (props) {
    this.someOption = props.someOption;

    cb();
  }.bind(this));*/
};

RiaGenerator.prototype.app = function app() {

  this.mkdir('app');
  //this.mkdir('app/templates');
  this.mkdir('app');
  this.mkdir('app/scripts');
  //this.mkdir('app/styles');
  //this.mkdir('app/images');
  //this.mkdir('test');

};

RiaGenerator.prototype.projectfiles = function projectfiles() {

  this.copy('index.html', 'app/index.html');
  this.copy('app.build.js', 'app/scripts/app.build.js');
  this.copy('app.js', 'app/scripts/app.js');
  this.copy('main.js', 'app/scripts/main.js');
  this.copy('jshintrc', '.jshintrc');
  this.copy('bowerrc', '.bowerrc');
  this.copy('_package.json', 'package.json'); 
  this.copy('_bower.json', 'bower.json');
  this.copy('_bower.json', 'bower.json');
  this.copy('_GruntFile.js', 'GruntFile.js');

};
