const {
  split,
  dissoc,
  tail,
  length,
  compose,
  head,
  keys
} = require('ramda');
const fileStructure = require('./directory.js');

const resolvePath = (path, directory) => {
  if (length(path) === 1) {
    return directory[head(path)];
  }

  return resolvePath(tail(path), directory[head(path)]);
};

module.exports = {
  statSync: function(path) {
    return resolvePath(split('/', path), fileStructure);
  },
  readdirSync: function(path) {
    return keys(
      compose(
        dissoc('isFile'),
        dissoc('isDirectory')
      )(resolvePath(split('/', path), fileStructure))
    );
  }
}
