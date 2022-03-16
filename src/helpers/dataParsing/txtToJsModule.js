var fs = require('fs');

const TXT_PATH = process.argv[2];
const NAME = process.argv[3];
if (!TXT_PATH || !NAME) {
  console.log('Missing parameter(s). Expects .txt path & output file name. Exiting.');
  process.exit();
}


fs.readFile(TXT_PATH, 'utf8', function(err, data) {
  if (err) throw err;

  const words = data.split('\n').map(lCase);
  console.log(`Got ${words.length} words.`);

  const jsModuleWords = arrToJsModule(words);

  const fileName = `../../data/${words.length}-${NAME}-words.js`;

  fs.writeFile(fileName, jsModuleWords, 'utf8', function(err, data) {
    if (err) throw err;
    console.log(fileName, 'Export complete.');
  });

});


function arrToJsModule(arr) {
  const wrappedSorted = arr.map(w => `"${w}"`).sort(alpha);
  return `
  export default [
    ${wrappedSorted.join(',\n')}
  ]`;
}

function alpha(a, b) {
  return a === b ? 0 : a < b ? -1 : 1;
};

function lCase(word) {
  return word.toLowerCase();
}

function isIn(arr) {
  return (word) => {
    return arr.includes(word);
  };
}