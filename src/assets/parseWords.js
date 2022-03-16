var fs = require('fs');

const alpha = (a, b) => {
  return a === b ? 0 : a < b ? -1 : 1;
}

fs.readFile('words2.txt', 'utf8', function(err, data) {
    if (err) throw err;
    const words = data.split('\n')
    const fiveLetterWords = words.filter(w => w.length === 5);
    const jsonWords = fiveLetterWords.map(w => `"${w}"`).sort(alpha);
    const json = `export default [
      ${jsonWords.join(',\n')}
    ]`
    fs.writeFile('fiveLetterCommonWords.js', json, 'utf8', function(err, data) {
      if (err) throw err;
      console.log('done');
    })
});