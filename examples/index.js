const {
  retrieveRecursive,
  files,
  filesByExtension
} = require('../lib/ffs');
const {
  not,
  compose
} = require('ramda');
const thisDirectory = './';

const dir = retrieveRecursive('node_modules');
const filesInDir = files(thisDirectory);
const allFiles = dir(files);
const jsFiles = dir(filesByExtension('js'));

console.log('Files in directory', filesInDir);
//console.log('All Files', allFiles);
//console.log('JS Filse', jsFiles);
