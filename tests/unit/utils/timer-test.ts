import Timer from 'dummy/utils/timer';
import { module, test } from 'qunit';
import sleep from '../../helpers/sleep';
import nearlyEqual from '../../helpers/nearly-equal';

module('Unit | Utility | timer', function(hooks) {
  hooks.afterEach(function() {
    window.performance.clearMarks();
    window.performance.clearMeasures();
  });

  test('Timer basically works', async function(assert) {
    let timer = new Timer('testing123');

    timer.start();

    await sleep(1000);

    timer.stop();

    assert.ok(nearlyEqual(timer.value.duration, 1000));
  });

  test('Timer.append works', async function(assert) {
    let foo = new Timer('foo');
    let bar = new Timer('bar');
    let baz = new Timer('baz');

    foo.start();

    foo.append(bar);

    assert.ok(foo.hasChildren, 'foo should have children after append');
    assert.equal(foo.children.length, 1, 'foo should have 1 child');
    assert.ok(foo.children[0] instanceof Timer, "foo's child should be a Timer");

    bar.start();
    await sleep(50);
    bar.stop();


    bar.append(baz);
    assert.ok(foo.children[0].hasChildren, "appending to a child should register on the parent");
    assert.equal(foo.children.length, 1, "appending to a child shouldn't affect the parent's child count");

    baz.start();
    await sleep(100);
    baz.stop();

    foo.stop();

    assert.ok(nearlyEqual(foo.value.duration, 150, 10), "foo's duration should be the sum of it's two children");
    assert.ok(nearlyEqual(bar.value.duration, 50), "bar's duration should be 50ms");
    assert.ok(nearlyEqual(baz.value.duration, 100), "baz's duration should be 100ms");
  });

  test('Timer#appendAndStart works', async function(assert) {
    let foo = new Timer('foo');

    foo.start();

    let bar = foo.appendAndStart('bar');

    assert.ok(foo.hasChildren, 'foo should have children after append');
    assert.equal(foo.children.length, 1, 'foo should have 1 child');
    assert.ok(foo.children[0] instanceof Timer, "foo's child should be a Timer");

    await sleep(50);
    bar.stop();


    let baz = bar.appendAndStart('baz');
    assert.ok(foo.children[0].hasChildren, "appending to a child should register on the parent");
    assert.equal(foo.children.length, 1, "appending to a child shouldn't affect the parent's child count");

    await sleep(100);
    baz.stop();

    foo.stop();

    assert.ok(nearlyEqual(foo.value.duration, 150, 10), "foo's duration should be the sum of it's two children");
    assert.ok(nearlyEqual(bar.value.duration, 50, 10), "bar's duration should be 50ms");
    assert.ok(nearlyEqual(baz.value.duration, 100, 10), "baz's duration should be 100ms");
  });
});
