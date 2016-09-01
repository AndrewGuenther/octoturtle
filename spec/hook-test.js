const Hook = require('../lib/hook');

describe('A set of conditions and reactions to a payload', () => {
  it('is a fluent interface', () => {
    const hook = new Hook('issues');
    expect(hook.is()).toBe(hook);
    expect(hook.to()).toBe(hook);
    expect(hook.by()).toBe(hook);
    expect(hook.do()).toBe(hook);
    expect(hook.if()).toBe(hook);
  });

  it('can respond to a specific event', () => {
    const hook = new Hook('issues');
    expect(hook.event).toBe('issues');
  });

  it('can respond to specific actions', () => {
    const hook = new Hook('issues').is('created');
    expect(hook.actions).toEqual(['created']);

    hook.is('closed', 'reopened');
    expect(hook.actions).toEqual(['created', 'closed', 'reopened']);
  });

  it('can respond to certain repositories', () => {
    const hook = new Hook('issues').to('AndrewGuenther/octoturtle');
    expect(hook.repositories).toEqual(['AndrewGuenther/octoturtle']);

    hook.to('docker/docker', 'github/hubot');
    expect(hook.repositories).toEqual(['AndrewGuenther/octoturtle',
        'docker/docker', 'github/hubot']);
  });

  it('can respond to certain submitters', () => {
    const hook = new Hook('issues').by('AndrewGuenther');
    expect(hook.senders).toEqual(['AndrewGuenther']);

    hook.by('warpling', 'Albatross');
    expect(hook.senders).toEqual(['AndrewGuenther', 'warpling', 'Albatross']);
  });

  it('can perform actions unconditionally', () => {
    const hook = new Hook('issues').do(() => {});
    expect(hook.eval('issues', {})).toBe(true);
  });

  it('can perform actions only when certain conditions are met', () => {
    let evaluated = false;
    let hook = new Hook('issues').if(() => {
      return true;
    }, () => {
      evaluated = true;
    });
    expect(hook.eval('issues', {})).toBe(true);
    expect(evaluated).toBe(true);

    evaluated = false;
    hook = new Hook('issues').if(() => {
      return false;
    }, () => {
      evaluated = true;
    });
    expect(hook.eval('issues', {})).toBe(false);
    expect(evaluated).toBe(false);
  });
});
