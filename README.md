ember-gjallarhorn
==============================================================================

Inspired by [heimdalljs](https://github.com/heimdalljs/heimdalljs-lib), which is a very interesting approach to performance measurement that unfortunately appears to be blocked at the moment.

Trees of timers. Timer trees. A timer forest?

Create timers in your code:

```js
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

  console.log(JSON.stringify(timer.toJSON()));
})
```

Get JSON output:
```JSON
{
  "name": "service:state:load",
  "duration": 386.89999999769,
  "children": [
    {
      "name": "service:state:load:foo",
      "duration": 308.49999999919,
      "children": [
        {
          "name": "service:state:load:foo:bar",
          "duration": 207.80000000013,
          "children": [
            {
              "name": "service:state:load:foo:bar:baz",
              "duration": 53.800000001502
            },
            {
              "name": "service:state:load:foo:bar:baq",
              "duration": 153.90000000116
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
