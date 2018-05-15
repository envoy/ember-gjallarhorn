import Service from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import Timer from 'ember-gjallarhorn';

export default Service.extend({
  load: task(function*() {
    let timer = new Timer('service:state:load');
    timer.start();
    yield timeout(75);

    let foo = timer.startChild('foo');
    yield timeout(100);

    let bar = foo.startChild('bar');

    bar.startChild('baz');
    yield timeout(50);
    bar.stopChild('baz');

    bar.startChild('baq')
    yield timeout(150);

    timer.stop(); // Stop this timer and all children

    JSON.stringify(timer.toJSON());
  })
});
