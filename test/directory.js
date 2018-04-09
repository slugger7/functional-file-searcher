const { T, F } = require('ramda');
const types = {
  file: 'file',
  directory: 'directory'
};

const file = {
  isDirectory: F,
  isFile: T
}

const directoryList = {
  theDirectory: {
    isDirectory: T,
    isFile: F,
    fileOne: file,
    "fileTwo.type": file,
    "something.txt": file,
    nestedDirectory: {
      isDirectory: T,
      isFile: F,
      fileInNestedDirectory: file,
      "fileInNestedDirectory.type": file
    },
    anotherDirectory: {
      isFile: F,
      isDirectory: T
    },
    notThisOne: {
      isFile: F,
      isDirectory: T
    }
  }
};

module.exports = directoryList;
