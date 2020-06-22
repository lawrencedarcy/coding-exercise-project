function pairingTest() {
  return;
}

const { words } = require('./dictionary.js');
console.log(words);
const dict = words.split(' ');

// Calculate the score for a word. The score is the sum of the points for the letters that make up a word. For example:
// GUARDIAN = 2 + 1 + 1 + 1 + 2 + 1 + 1 + 1 = 10

// Use these points for each letter:

// - 1 point: E, A, I, O, N, R, T, L, S, U
// - 2 points: D, G
// - 3 points: B, C, M, P
// - 4 points: F, H, V, W, Y
// - 5 points: K
// - 8 points: J, X
// - 10 points: Q, Z

// Assign seven tiles chosen randomly from the english alphabet to a player's rack.
// In the real game, tiles are taken at random from a 'bag' containing a fixed number of each tile. Assign seven tiles to a rack using a bag containing this distribution:
// - 12 tiles: E
// - 9 tiles: A,I
// - 8 tiles: O
// - 6 tiles: N,R,T
// - 4 tiles: L,S,U,D
// - 3 tiles: G
// - 2 tiles: B,C,M,P,F,H,V,W,Y
// - 1 tiles: K,J,X,Q,Z

// Find a valid word formed from the seven tiles. A list of valid words can be found in twl06.txt.
// Find the longest valid word that can be formed from the seven tiles.
// Find the highest scoring word that can be formed.
// Find the highest scoring word if any one of the letters can score triple.
// For discussion: how would we adapt our solution for a multiplayer environment?

const values = {
  1: ['E', 'A', 'I', 'O', 'N', 'R', 'T', 'L', 'S', 'U'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

const freqs = {
  12: ['E'],
  9: ['A', 'I'],
  8: ['O'],
  6: ['N', 'R', 'T'],
  4: ['L', 'S', 'U', 'D'],
  3: ['G'],
  2: ['B', 'C', 'M', 'P', 'F', 'H', 'V', 'W', 'Y'],
  1: ['K', 'J', 'X', 'Q', 'Z']
};

const reformatValues = valuesObj => {
  const newObj = {};

  for (i in valuesObj) {
    for (let j = 0; j < valuesObj[i].length; j++) {
      newObj[valuesObj[i][j]] = parseInt(i);
    }
  }
  return newObj;
};

const letterValues = reformatValues(values);

const letterFreqs = reformatValues(freqs);

console.log(letterFreqs);

const calculateScore = word => {
  word = word.toUpperCase();
  const letters = word.split('');
  let total = 0;
  letters.forEach(l => (total += letterValues[l]));
  return total;
};

const drawTiles = num => {
  const results = [];
  const letters = Object.keys(letterFreqs);

  for (let i = 0; i < num; i++) {
    let random = letters[Math.floor(Math.random() * letters.length)];
    results.push(random);
    letterFreqs[random] -= 1;
  }
  return results;
};

// find words
// for each letter, swap it with

const genWords = letters => {
  const results = [];

  const helper = cache => {
    for (let i = 0; i < letters.length; i++) {
      cache += letters[i];
      if (dict.indexOf(cache) !== -1) {
        results.push(cache);
      }

      if (cache.length < letters.length) {
        helper(cache);
      }

      cache = cache.slice(0, -1);
    }
  };

  helper('');
  return results;
};

console.log(genWords(['a', 'b', 'c', 'd', 'e', 't']));

module.exports = {
  pairingTest,
  calculateScore
};
