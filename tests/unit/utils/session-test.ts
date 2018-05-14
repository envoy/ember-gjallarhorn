import Session from 'dummy/utils/session';
import Timer from 'dummy/utils/timer';
import { module, test } from 'qunit';
import sleep from '../../helpers/sleep';
import nearlyEqual from '../../helpers/nearly-equal';

module('Unit | Utility | session', function(hooks) {
  hooks.afterEach(function() {
    window.performance.clearMarks();
    window.performance.clearMeasures();
  });

  test('Session works', async function(assert) {
    let timer = new Session('testingSession');
    let start = timer.start();

    assert.ok(start instanceof Timer);

    await sleep(1000);

    timer.stop(start);

    assert.ok(nearlyEqual(start.data.duration, 1000));

    let status = timer.status;

    assert.equal(status.length, 1);

    assert.ok(status[0] instanceof PerformanceMeasure)
  });
});
