'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const to = require('to-case');

const ComponentTypes = {
  FUNCTIONAL: 'Functional',
  CLASS: 'Class'
};

module.exports = class extends Generator {
  prompting() {
    this.log(yosay('Atomic ' + chalk.red('Component Generator')));

    const prompts = [{
      type: 'input',
      name: 'componentName',
      message: 'What is the name of your component?',
      default: 'Component'
    }, {
      type: 'list',
      name: 'componentType',
      message: 'Functional or class based component?',
      choices: [ComponentTypes.FUNCTIONAL, ComponentTypes.CLASS]
    }, {
      type: 'confirm',
      name: 'includeTest',
      message: 'Include a test file?',
      default: true
    }];

    return this.prompt(prompts).then(props => {
      this.props = props;
      Object.assign(this.options, props);
    });
  }

  writing() {
    const isFunctional = this.options.componentType === ComponentTypes.FUNCTIONAL;
    const templateFileName = isFunctional ? 'functional.ejs' : 'class.ejs';
    const componentFileName = to.snake(this.options.componentName);

    this.fs.copyTpl(
      this.templatePath(templateFileName),
      this.destinationPath(`${componentFileName}.jsx`),
      {
        componentName: this.options.componentName
      }
    );

    if (this.options.includeTest) {
      this.composeWith(
        require.resolve('../test'),
        {
          componentName: this.options.componentName,
          componentFilePath: './' + componentFileName
        }
      );
    }
  }
};
