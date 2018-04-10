const { assert } = require('chai');
const fsSpy = require('./tools/fsmock.js');
const proxyquire = require('proxyquire-2');
const {
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
} = proxyquire('../lib/ffs.js', {
  fs: fsSpy
});

describe(`Testing the ffs`, () => {
  const dir = 'root';
  let root;

  beforeEach(() => {
    root = inDir(dir);
  });

  describe('file fetchers', () => {
    describe('non-recursive', () => {
      it(`should fetch all of the files in the ${dir} directory`, () => {
        const expected = [
          `${dir}/someText.txt`,
          `${dir}/someImage.jpg`,
          `${dir}/someCode.js`,
          `${dir}/file`
        ];

        const actual = root(files);

        assert.deepEqual(actual, expected);
      });

      it(`should fetch all of the files that contain "some" in the ${dir} directory`, () => {
        const expected = [
          `${dir}/someText.txt`,
          `${dir}/someImage.jpg`,
          `${dir}/someCode.js`
        ];

        const actual = root(filesByName('some'));

        assert.deepEqual(actual, expected);
      });

      it(`should fetch a file that has the name of "someText.txt" in the ${dir} directory`, () => {
        const expected = `${dir}/someText.txt`;

        const actual = root(fileByName('someText.txt'));

        assert.equal(actual, expected);
      });

      it(`should return all of the files in ${dir} directory that have the file extension of "txt"`, () => {
        const expected = [
          `${dir}/someText.txt`
        ];

        const actual = root(filesByExtension('txt'));

        assert.deepEqual(actual, expected);
      });
    });

    describe('recursive', () => {
      describe('filter', () => {
        beforeEach(() => {
          root = operation => inDir(dir, recursiveFilter(operation));
        });

        it(`should get all of the files nested within ${dir} directory`, () => {
          const expected = [
            `${dir}/someText.txt`,
            `${dir}/someImage.jpg`,
            `${dir}/someCode.js`,
            `${dir}/file`,
            `${dir}/subDirectory/nestedImage.jpg`,
            `${dir}/subDirectory/nestedCode.js`,
            `${dir}/subDirectory/nestedText.txt`,
            `${dir}/subDirectory/file`
          ];

          const actual = root(files);

          assert.deepEqual(actual, expected);
        });

        it(`should get all of the files that contain the "Image" word in the name from ${dir} directory`, () => {
          const expected = [
            `${dir}/someImage.jpg`,
            `${dir}/subDirectory/nestedImage.jpg`
          ];

          const actual = root(filesByName('Image'));

          assert.deepEqual(actual, expected);
        });

        it(`should get all of the files with the "js" extension in the ${dir} directory`, () => {
          const expected = [
            `${dir}/someCode.js`,
            `${dir}/subDirectory/nestedCode.js`
          ];

          const actual = root(filesByExtension('js'));

          assert.deepEqual(actual, expected);
        });
      });
      describe('find', () => {
        beforeEach(() => {
          root = operation => inDir(dir, recursiveFind(operation));
        });

        it(`should find the file "nestedText.txt" in the directory structure`, () => {
          const expected = `${dir}/subDirectory/nestedText.txt`;

          const actual = root(fileByName('nestedText.txt'));

          assert.equal(actual, expected);
        });
      });
    });
  });
});
