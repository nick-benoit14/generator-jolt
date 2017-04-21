'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');

module.exports = class extends Generator {
  prompting() {
    this.log(yosay('Atomic ' + chalk.red('Test Generator')));

    const prompts = [{
      type: 'input',
      name: 'componentName',
      message: 'What is the name of your component?',
      default: 'Component'
    }, {
      type: 'input',
      name: 'componentFilePath',
      message: 'What is the path to your component?',
      default: './component'
    }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
      Object.assign(this.options, props);
    });
  }

  writing() {
    const fileName = path.parse(this.options.componentFilePath).base;
    this.fs.copyTpl(
      this.templatePath('test.ejs'),
      this.destinationPath(`${fileName}.test.jsx`),
      {
        componentName: this.options.componentName,
        componentFilePath: this.options.componentFilePath
      }
    );
  }
};
