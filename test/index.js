const assert = require('assert');
const main = require('../index.js')

describe('parsing date', () => {
    it('can parse year', () => {
        assert.equal(main.getYear('1993-01-05'), 1993);
    });
    it('can parse month january', () => {
        assert.equal(main.getMonth('1993-01-05'), 1);
    });
    it('can parse month november', () => {
        assert.equal(main.getMonth('1993-11-05'), 11);
    });
});
