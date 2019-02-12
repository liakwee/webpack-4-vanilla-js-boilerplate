/* eslint-disable */
const fs = require('fs');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const { prompt } = require('enquirer');

const skip_setup = process.env.SKIP_SETUP || false;

async function runSetup() {
  clear();
  console.log(
    chalk.red(figlet.textSync('Static Site Boilerplate', { horizontalLayout: 'fitted' }))
  );

  const questions = await prompt([
    {
      type: 'input',
      name: 'site_name',
      message: 'What is the name of your website?',
      initial: 'Static Site Boilerplate'
    },
    {
      type: 'input',
      name: 'site_description',
      message: 'What is a description of your website?',
      initial: 'A modern boilerplate for static website development'
    },
    {
      type: 'input',
      name: 'site_url',
      message: 'What is the live URL for your website?',
      hint: 'http://yourwebsite.com'
    },
    {
      type: 'input',
      name: 'google_analytics',
      message: 'What is your Google Analytics Tracking ID?',
      hint: 'UA-XXXXX-Y'
    }
  ]);

  // Update site configuration
  fs.readFile('./config/site.config.js', 'utf8', (err, data) => {
    if (typeof questions.site_name !== 'undefined') {
      data = data.replace(/site_name: '.*?'/g, `site_name: '${questions.site_name}'`);
    }
    if (typeof questions.site_description !== 'undefined') {
      data = data.replace(
        /site_description: '.*?'/g,
        `site_description: '${questions.site_description}'`
      );
    }
    if (typeof questions.site_url !== 'undefined') {
      data = data.replace(/site_url: '.*?'/g, `site_url: '${questions.site_url}'`);
    }
    if (typeof questions.google_analytics !== 'undefined') {
      data = data.replace(
        /googleAnalyticsUA: '.*?'/g,
        `googleAnalyticsUA: '${questions.google_analytics}'`
      );
    }

    fs.writeFile('./config/site.config.js', data, 'utf8', err => {});
  });
}

if (!skip_setup) {
  runSetup();
}
