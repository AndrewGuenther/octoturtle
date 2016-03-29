var Hook = require('../lib/hook.js');

describe('A set of conditions and reactions to a payload', function() {
  it('is a fluent interface', function() {
    var hook = new Hook('issues');
    expect(hook.is()).toBe(hook);
    expect(hook.to()).toBe(hook);
    expect(hook.by()).toBe(hook);
    expect(hook.do()).toBe(hook);
    expect(hook.if()).toBe(hook);
  });

  it('can respond to a specific event', function() {
    var hook = new Hook('issues');
    expect(hook.event).toBe('issues');
  });

  it('can respond to specific actions', function() {
    var hook = new Hook('issues').is('created');
    expect(hook.actions).toEqual(['created']);

    hook.is('closed', 'reopened');
    expect(hook.actions).toEqual(['created', 'closed', 'reopened']);
  });

  it('can respond to certain repositories', function() {
    var hook = new Hook('issues').to('AndrewGuenther/octoturtle');
    expect(hook.repositories).toEqual(['AndrewGuenther/octoturtle']);

    hook.to('docker/docker', 'github/hubot');
    expect(hook.repositories).toEqual(['AndrewGuenther/octoturtle',
        'docker/docker', 'github/hubot']);
  });

  it('can respond to certain submitters', function() {
    var hook = new Hook('issues').by('AndrewGuenther');
    expect(hook.senders).toEqual(['AndrewGuenther']);

    hook.by('warpling', 'Albatross');
    expect(hook.senders).toEqual(['AndrewGuenther', 'warpling', 'Albatross']);
  });

  it('can perform actions unconditionally', function() {
    var hook = new Hook('issues').do(function() {});
    expect(hook.eval('issues', {})).toBe(true);
  });

  it('can perform actions only when certain conditions are met', function() {
    var evaluated = false;
    var hook = new Hook('issues').if(function() {
      return true;
    }, function() {
      evaluated = true;
    });
    expect(hook.eval('issues', {})).toBe(true);
    expect(evaluated).toBe(true);

    evaluated = false;
    hook = new Hook('issues').if(function() {
      return false;
    }, function() {
      evaluated = true;
    });
    expect(hook.eval('issues', {})).toBe(false);
    expect(evaluated).toBe(false);
  });
});
