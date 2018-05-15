import Service from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import { Timer } from 'ember-timerz';

export default Service.extend({
  load: task(function*() {
    let timer = new Timer('service:state:load');
    timer.start();
    yield timeout(75);

    let foo = timer.addChild('foo');
    yield timeout(100);

    let bar = foo.addChild('bar');

    let baz = bar.addChild('baz');
    yield timeout(50);
    baz.stop();

    bar.addChild('baq')
    yield timeout(150);

    timer.stop();

    JSON.stringify(timer.toJSON());
  })
});
