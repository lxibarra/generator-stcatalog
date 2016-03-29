'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
module.exports = yeoman.Base.extend({
  prompting:function() {
    var done = this.async();
    var prompts = [
      {
        type:'confirm',
        name:'action',
        message:'Alo Alo, would you like to scaffold a CRUD resource?',
        default:true
      }
    ];

    this.prompt(prompts, function(props) {
      if(props.action) {
        done();
      } else {
        this.log('CRUD generator aborted');
      }
    }.bind(this))
  },
  generate: function() {
    var done = this.async();

    var prompts = [
    {
      type:'input',
      name:'resource',
      message:'Please provide the name of the route',
      default:'resource'
    }];
    this.prompt(prompts, function(props) {
      this.props = props;
      done();
    }.bind(this));
  },

  writing:function() {
    //var done = this.async();
    this.fs.copyTpl(
      this.templatePath('controller.js'),
      this.destinationPath('controllers/' + this.props.resource + '_controller.js'),
      {controller_name: 'SuperWork'}
    );

    this.fs.copy(
      this.templatePath('model.js'),
      this.destinationPath('models/' + this.props.resource + '_model.js')
    );

    this.fs.copy(
      this.templatePath('view.js'),
      this.destinationPath('views/' + this.props.resource + '_view.js')
    );

    this.fs.copy(
      this.templatePath('template.dust'),
      this.destinationPath('templates/' + this.props.resource + '_template.dust')
    )

    //done();
  },

  readAppendRoutes:function() {
    //pending to add the routes to route.js in a safe way
  }

});
