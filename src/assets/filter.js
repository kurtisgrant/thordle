const common = require('./fiveLetterCommonWords');
const scrabble = require('./fiveLetterWords');

const shared = common.map(word => word.toLowerCase()).filter(word => {
  return scrabble.includes(word.toLowerCase());
});

const jsonWords = shared.map(word => `"${word.}"`)

const json = `export default [
  ${jsonWords.join(',\n')}
]`;


const notShared = common.map(word => word.toLowerCase()).filter(word => {
  return !scrabble.includes(word.toLowerCase());
});

console.log(notShared);

console.log('Common words: ', common.length);
console.log('Scrabble words: ', scrabble.length);

console.log('Shared words: ', shared.length);
console.log('Percentage: ', shared.length / common.length * 100, '%');

var fs = require('fs');

const alpha = (a, b) => {
  return a === b ? 0 : a < b ? -1 : 1;
};

fs.writeFile('fiveLetterCommonWords.js', json, 'utf8', function(err, data) {
  if (err) throw err;
  console.log('done');
});