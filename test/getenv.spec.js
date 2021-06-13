const assert = require('assert');
const getenv = require('../lib/getenv');

describe('getenv', () => {
  it('does not throw if variable not defined and "exitIfUndefined" is set to false', (done) => {
    const value = getenv('Variable', false);
    assert(typeof value === 'undefined');
    done();
  });
});

