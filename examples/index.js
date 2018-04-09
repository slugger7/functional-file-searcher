const {
  retrieveRecursive,
  files,
  filesByType
} = require('../lib/ffs');
const {
  not,
  compose
} = require('ramda');

const dir = retrieveRecursive('node_modules');

const allFiles = dir(files);
const jsFiles = dir(filesByType('js'));

console.log('All Files', allFiles);
console.log('JS Filse', jsFiles);
