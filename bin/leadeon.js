#!/usr/bin/env node

require('commander')
  .version(require('../package').version)
  .description('a simlpe cli for leadeon web project')
  .usage('<command>')
  .command('init', 'create a new project straight from a gitLab template')
  .parse(process.argv);

