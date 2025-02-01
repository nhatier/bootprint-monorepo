# thought-plugin-jsdoc 

[![NPM version](https://img.shields.io/npm/v/thought-plugin-jsdoc.svg)](https://npmjs.com/package/thought-plugin-jsdoc)
[![Travis Build Status](https://travis-ci.org/nknapp/thought-plugin-jsdoc.svg?branch=master)](https://travis-ci.org/nknapp/thought-plugin-jsdoc)
[![Coverage Status](https://img.shields.io/coveralls/nknapp/thought-plugin-jsdoc.svg)](https://coveralls.io/r/nknapp/thought-plugin-jsdoc)

> Add jsdoc to your Thought-generated README.md


# Installation

```
npm install thought-plugin-jsdoc
```

## Usage

In order to use this plugin for [thought](https://npmjs.com/package/thought),
first add it to the dev-dependencies of your project

```bash
npm install --save-dev thought-plugin-jsdoc
```

You can then add a file `.thought/config.js` to your 
project, with the following contents.

```js
module.exports = {
  plugins: [
    require('thought-plugin-jsdoc')
  ]
}
```

Thought will then add the jsdoc-comments of your main-file to the README.md

You can see this in [the example-project](examples/example-project)

## Configuration 

This plugin applies the following configuration

### Partials
#### [api.md.hbs](src/partials/api.md.hbs)

    
```hbs
{{#if package.main}}
# API reference

{{{jsdoc package.main}}}
{{/if}}

```

### Helpers

<a name="jsdoc"></a>

## jsdoc(globPattern) ⇒ <code>string</code>
Uses `jsdoc-to-markdown` to render jsdoc for files matching a given glob pattern

**Kind**: global function  
**Returns**: <code>string</code> - the generated API reference as markdown  
**Api**: public  

| Param | Type | Description |
| --- | --- | --- |
| globPattern | <code>string</code> | a glob-pattern to identify the files to generate docs from |


    

# API reference




# License

`thought-plugin-jsdoc` is published under the MIT-license.

See [LICENSE.md](LICENSE.md) for details.


# Release-Notes
 
For release notes, see [CHANGELOG.md](CHANGELOG.md)
 
# Contributing guidelines

See [CONTRIBUTING.md](CONTRIBUTING.md).