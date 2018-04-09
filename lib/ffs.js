const { statSync, readdirSync} = require('fs');
const { join } = require('path');
const {
  map,
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

const filesByExtension = type => filesByPredicate(isExtension(type));
const filesByName = name => filesByPredicate(equals(name));

const fileByName = name => fileByPredicate(contains(name));

const directoriesByName = name => directoriesByPredicate(contains(name));

const directoryByName = name => directoryByPredicate(equals(name));

const retrieveRecursive = curry((source, lamda) => compose(
  concat(lamda(source)),
  flatten,
  map(flip(retrieveRecursive)(lamda)),
  directories
)(source));

module.exports = {
  directories,
  files,
  filesByExtension,
  filesByName,
  fileByName,
  directoriesByName,
  directoryByName,
  retrieveRecursive
};
