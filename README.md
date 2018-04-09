# Functional File Searcher #

This is a synchronous file searcher that relies on using smaller functions passed into each other to create custom file searching functions.

## Ramda ##

If you are already using [Ramda JS](http://ramdajs.com "To Ramda!") this should be right at home for you as it is built with ramda. 

## Installation ##

```
npm i functional-file-searcher
```

## Usage ##

### Directory Strucure ###

```
*theDirectory
| fileOne 
| fileTwo.type
| something.txt
| *nestedDirectory
| | fileInNestedDirectory
| | fileInNestedDirectory.type
| *anotherDirectory
```

### Listing all of the files in a directory ###

```
const { files } = require('functinoal-file-searcher');

const filesInSomeDirectory = files('theDirectory');

console.log('The files in the directory: ', filesInSomeDirectory);
```

#### Log: ####

```
/* The files in the directory: [
"theDirectory/fileOne",
"fileTwo.type",
"something.txt"
] */
```

### Listing all files in a directory that match on a name ###

```
const { filesByName } = require('functional-file-searcher');

const filesWithName = filesByName('theDirectory, 'file');

console.log('The files that contain "file": ', filesWithName;
```

#### Log: ####

```
/* The files that contain "file": [
"fileOne",
"fileTwo.type"
]*/
```

### Listing all the directories in a directory ###
```
const { directories } = require('functional-file-searcher');

const dirs = directories('')
```
