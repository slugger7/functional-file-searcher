const { statSync, readdirSync } = require('fs');
const { join } = require('path');
const {
  map,
  ifElse,
  flip,
  filter,
  find,
  compose,
  curry,
  flatten,
  concat,
  equals,
  split,
  last,
  allPass,
  contains
} = require('ramda');

const inDir = curry((directory, operation) => operation(directory));

const byPredicate = curry((criteria, predicate, source) => compose(
  criteria(predicate),
  map(name => join(source, name)),
  readdirSync
)(source));

const filterByPredicate = byPredicate(filter);

const findByPredicate = byPredicate(find);

const isDirectory = source => statSync(source).isDirectory();
const directories = filterByPredicate(isDirectory);

const isFile = source => statSync(source).isFile();
const files = filterByPredicate(isFile);

const isExtension = exstension => compose(
  equals(exstension),
  last,
  split('.')
);

const isFileAndPredicate = predicate => allPass([isFile, predicate]);
const isDirectoryAndPredicate = predicate => allPass([isDirectory, predicate]);

const filesByPredicate = predicate => filterByPredicate(isFileAndPredicate(predicate));
const fileByPredicate = predicate => findByPredicate(isFileAndPredicate(predicate));

const directoriesByPredicate = predicate => filterByPredicate(isDirectoryAndPredicate(predicate));
const directoryByPredicate = predicate => findByPredicate(isDirectoryAndPredicate(predicate));

const nameContains = name => compose(
  contains(name),
  last,
  split('/')
);

const filesByExtension = curry((extension, source) => filesByPredicate(isExtension(extension))(source));
const filesByName = curry((name, source) => filesByPredicate(nameContains(name))(source));

const fileByName = curry((name, source) => fileByPredicate(equals(join(source, name)))(source));

const directoriesByName = curry((name, source) => directoriesByPredicate(nameContains(name))(source));

const directoryByName = curry((name, source) => directoryByPredicate(equals(join(source, name)))(source));

const recursiveFilter = curry((operation, source) => compose(
  concat(operation(source)),
  flatten,
  map(recursiveFilter(operation)),
  directories
)(source));

const recursiveFind = curry((operation, source) => 
  operation(source) ||
    find(recursiveFind(operation), directories(source))
);

module.exports = {
  inDir,
  directories,
  files,
  filesByExtension,
  filesByName,
  fileByName,
  directoriesByName,
  directoryByName,
  recursiveFilter,
  recursiveFind
};
