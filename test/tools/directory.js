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
  root: {
    isDirectory: T,
    isFile: F,
    "someText.txt": file,
    "someImage.jpg": file,
    "someCode.js": file,
    file: file,
    subDirectory: {
      isDirectory: T,
      isFile: F,
      "nestedImage.jpg": file,
      "nestedCode.js": file,
      "nestedText.txt": file,
      file: file
    },
    secondSubDirectory: {
      isFile: F,
      isDirectory: T
    },
    secondDirectory: {
      isFile: F,
      isDirectory: T
    }
  }
};

module.exports = directoryList;
