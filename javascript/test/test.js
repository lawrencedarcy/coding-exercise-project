const { pairingTest, calculateScore } = require('../src/pairing-test');

test('calculate score', () => {
    expect(calculateScore('GUARDIAN')).toBe(10);

});