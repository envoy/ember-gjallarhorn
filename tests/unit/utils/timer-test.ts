import Timer from 'dummy/utils/timer';
import { module, test } from 'qunit';
import sleep from '../../helpers/sleep';
import nearlyEqual from '../../helpers/nearly-equal';

module('Unit | Utility | timer', function(hooks) {
  hooks.afterEach(function() {
    window.performance.clearMarks();
    window.performance.clearMeasures();
  });

  test('Timer works', async function(assert) {
    let timer = new Timer('testing123');

    timer.start();

    await sleep(1000);

    timer.stop();

    assert.ok(nearlyEqual(timer.time.duration, 1000));
  });
});
