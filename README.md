# customize-engine-handlebars

> Use handlebars as engine for customize


# Installation

```
npm install customize-engine-handlebars
```

## Usage

The following example demonstrates how to use this module:

<pre><code>examples/
├── config-module.js
├── example-merge.js
├── example.js
├── hb-helpers.js
├── hb-preprocessor.js
├── partials/
│   └── footer.hbs
├── partials2/
│   └── footer.hbs
└── templates/
    ├── text1.txt.hbs
    └── text2.txt.hbs</code></pre>

### Configuration

The following usage example has a configuration for all possible properties
of the Handlebars-engine:

```js
var customize = require('customize')
customize()
  .registerEngine('handlebars', require('customize-engine-handlebars'))
  .load(require('./config-module.js'))
  .run()
  .done(console.log)
```

This example loads its configuration from the module `config-module.js`

```js
module.exports = function (customize) {
  return customize.merge({
    handlebars: {
      // Directory containing templates
      templates: 'templates',
      // Directory containing partials
      partials: 'partials',
      // JS-file exporting Handlebars helper-functions
      helpers: 'hb-helpers.js',
      // JS-file exporting a preprocessor function
      preprocessor: 'hb-preprocessor.js',
      // Input data for Handlebars
      data: {
        name: 'Nils',
        city: 'Darmstadt'
      }
    }
  })
}

```


*A quick note: If your are really creating a configuration-module, you should always
use `require.resolve` or `__dirname` to determine the correct path to referenced files.*

All the templates in the `templates` directory are called with the provided `data` (name and city).
Each one generates an entry in the result of the engine. The templates call a partial that is 
inserted below the main content. Helper functions from the `hb-helpers.js`-file are registered 
with Handlebars and `text2.txt.hbs` uses the `shout`-helper from `hb-helpers.js` to turn a 
string into upper-case. 

```hbs
I'm {{name}}

I'm living in {{shout city}}.

{{>footer}}
```


The example also includes a preprocessor (`hb-preprocessor.js`) that calls [the open weather map API](http://openweathermap.org/current#name)
to determine the current weather in the given city. 

```js
module.exports = function (data) {
  var url = 'http://api.openweathermap.org/data/2.5/weather?q=' +
    data.city +
    '&units=metric'
  return {
    name: data.name,
    city: data.city,
    weather: require('get-promise')(url).get('data').then(JSON.parse)
  }
}

```


The result is injected into the data as `weather` property and rendered by 
the `footer.hbs` partial.

```hbs
------
Weather: {{{weather.weather.0.description}}}
```


The output of this example is:

```
{ handlebars: 
   { 'text1.txt': 'I\'m Nils\n\nI\'m living in Darmstadt.\n\n------\nWeather: ',
     'text2.txt': 'I\'m Nils\n\nI\'m living in DARMSTADT.\n\n------\nWeather: ' } }
```


### Customizing configurations

We can use the mechanism of [customize](https://npmjs.com/package/customize) to adapt the configuration.
In the following example, we replace the `footer.hbs`-partial by a different version.
We do this by specifying a new partial directory. Partials with the same name as in 
the previous directory will overwrite the old one.

```js
var customize = require('customize')
customize()
  .registerEngine('handlebars', require('customize-engine-handlebars'))
  .load(require('./config-module.js'))
  .merge({
    handlebars: {
      partials: 'partials2'
    }
  })
  .run()
  .done(console.log)
```

The new `footer.hbs` writes only the current temperature, instead of the weather description

```hbs
------
Temperature: {{{weather.main.temp}}}
```


The output of this example is

```
{ handlebars: 
   { 'text1.txt': 'I\'m Nils\n\nI\'m living in Darmstadt.\n\n------\nTemperature: ',
     'text2.txt': 'I\'m Nils\n\nI\'m living in DARMSTADT.\n\n------\nTemperature: ' } }
```

In a similar fashion, we could replace other parts of the configuration, like templates, helpers
and the pre-processor. If we would provide a new preprocessor, it could call the old one,
by calling `this.parent(args)`


##  API-reference

<a name="CustomizeHandlebarsConfig"></a>
### CustomizeHandlebarsConfig : <code>object</code>
The default configuration for the handlebars engine

**Kind**: global typedef  
**Api**: public  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| partials | <code>string</code> | path to a partials directory. Each `.hbs`-file in the directory (or in the tree)   is registered as partial by its name (or relative path), without the `.hbs`-extension. |
| helpers | <code>string</code> &#124; <code>object</code> &#124; <code>function</code> | if this is an object it is assumed to be a list of helper functions,   if this is function it is assumed to return an object of helper functions, if this is a string,   it is assumed to be the path to a module returning either an object of a function as above. |
| templates | <code>string</code> | path to a directory containing templates. Handlebars is called with each `.hbs`-file   as template. The result of the engine consists of an object with a property for each template and the   Handlebars result for this template as value. |
| data | <code>object</code> | a javascript-object to use as input for handlebars |
| preprocessor | <code>function</code> &#124; <code>string</code> | a function that takes the input data as first parameter and   transforms it into another object or the promise for an object. It the input data is a promise itself,   is resolved before calling this function. If the preprocessor is overridden, the parent   preprocessor is available with `this.parent(data)` |
| hbsOptions | <code>object</code> | options to pass to `Handlebars.compile`. |




## License

`customize-engine-handlebars` is published under the MIT-license. 
See [LICENSE.md](LICENSE.md) for details.

## Release-Notes
 
For release notes, see the [changelog](CHANGELOG.md)
 
## Contributing guidelines

See [CONTRIBUTING.md](CONTRIBUTING.md).