ember-gjallarhorn
==============================================================================

[![Build Status](https://travis-ci.org/envoy/ember-gjallarhorn.svg?branch=master)](https://travis-ci.org/envoy/ember-gjallarhorn)

Inspired by [heimdalljs](https://github.com/heimdalljs/heimdalljs-lib), which is a very interesting approach to performance measurement that unfortunately appears to be blocked at the moment.

Trees of timers. Timer trees. A timer forest?

Create timers in your code:

```js
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

  console.log(JSON.stringify(timer.toJSON()));
})
```

Get JSON output:
```JSON
{
  "name": "service:state:load",
  "duration": 384.50000000012,
  "children": [
    {
      "name": "service:state:load:foo",
      "duration": 305.39999999746,
      "children": [
        {
          "name": "service:state:load:foo:bar",
          "duration": 204.79999999952,
          "children": [
            {
              "name": "service:state:load:foo:bar:baz",
              "duration": 54.000000003725
            },
            {
              "name": "service:state:load:foo:bar:baq",
              "duration": 150.69999999832
            }
          ]
        }
      ]
    }
  ]
}
```

Installation
------------------------------------------------------------------------------

```
ember install ember-gjallarhorn
```


Usage
------------------------------------------------------------------------------

[Longer description of how to use the addon in apps.]


Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd ember-gjallarhorn`
* `yarn install`

### Linting

* `yarn lint:js`
* `yarn lint:js --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
