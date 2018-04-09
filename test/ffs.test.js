const { assert } = require('chai');
const fsSpy = require('./fsmock.js');
const proxyquire = require('proxyquire-2');
const {
  directories,
  files,
  filesByExtension,
  filesByName,
  fileByName,
  directoriesByName,
  directoryByName,
  retrieveRecursive
} = proxyquire('../lib/ffs.js', {
  fs: fsSpy
});

describe(`Testing the ffs`, () => {
  const dir = 'theDirectory';

  it('should return all of the files in the base directory', () => {
    const expected = [
      `${dir}/fileOne`,
      `${dir}/fileTwo.type`,
      `${dir}/something.txt`
    ];

    const actual = files(dir);

    assert.deepEqual(actual, expected);
  });

  it('should return all of the files of type "type" in the base directory', () => {
    const expected = [
      `${dir}/fileTwo.type`
    ];

    const actual = filesByExtension(dir, 'type');

    assert.deepEqual(actual, expected);
  });

  it('should return all of the files that contain the name "file" in the base directory', () => {
    const expected = [
      `${dir}/fileOne`,
      `${dir}/fileTwo.type`
    ];

    const actual = filesByName(dir, 'file');

    assert.deepEqual(actual, expected);
  });

  it('should return the file matching the name "fileOne" in the base directory', () => {
    const expected = `${dir}/fileOne`;

    const actual = fileByName(dir, 'fileOne');

    assert.equal(actual, expected);
  });

  it('should return all the directiories in the base directory', () => {
    const expected = [
      `${dir}/nestedDirectory`,
      `${dir}/anotherDirectory`,
      `${dir}/notThisOne`
    ];

    const actual = directories(dir);

    assert.deepEqual(actual, expected);
  });

  it('should return all of the directories that contain "directory" in the base directory', () => {
    const expected = [
      `${dir}/nestedDirectory`,
      `${dir}/anotherDirectory`
    ];

    const actual = directoriesByName(dir, 'Directory');

    assert.deepEqual(actual, expected);
  });

  it('should find a directory by the name of "notThisOne" in the base directory', () => {
    const expected = `${dir}/notThisOne`;

    const actual = directoryByName(dir, 'notThisOne');

    assert.equal(actual, expected);
  });
});
