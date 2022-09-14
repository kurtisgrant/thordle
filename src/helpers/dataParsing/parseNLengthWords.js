var fs = require('fs');

// File paths
const COMMON_WORDS = 'src/commonWords.txt';
const SCRABBLE_WORDS = 'src/scrabbleWords.txt';

const WD_LENGTH = 5;

fs.readFile(SCRABBLE_WORDS, 'utf8', function(err, scblTxt) {
  if (err) throw err;

  const scrabbleWords = scblTxt.split('\n').map(lCase);
  console.log(`Got ${scrabbleWords.length} scrabble words.`);

  fs.readFile(COMMON_WORDS, 'utf8', function(err, cmnTxt) {

    const commonWords = cmnTxt.split('\n').map(lCase);
    console.log(`Got ${commonWords.length} common words.`);

    const overlap = commonWords.filter(isIn(scrabbleWords));
    console.log(`Got ${overlap.length} from overlap.`);

    const nLetterWords = overlap.filter(w => w.length === WD_LENGTH);
    console.log(`Got ${nLetterWords.length} ${WD_LENGTH} letter words from overlap.`);

    const jsModuleWords = arrToJsModule(nLetterWords);

    const fileName = `../../data/${nLetterWords.length}-${WD_LENGTH}-letter-words.js`;

    fs.writeFile(fileName, jsModuleWords, 'utf8', function(err, data) {
      if (err) throw err;
      console.log(fileName, 'Export complete.');
    });

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