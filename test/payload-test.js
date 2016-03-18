var Payload = require('../lib/payload.js');

describe('A convenience wrapper for useful response fields', function() {
  it('can retrieve the event action', function() {
    var payload = Payload.extendPayload(buildResponse('issuesopened'));

    expect(payload.getAction()).toBe('opened');
  })
})
