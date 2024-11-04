# Custom Helpers

Handlebars supports custom helpers, you can find the official doc [here](https://handlebarsjs.com/guide/#custom-helpers)

In this application, you can register custom helpers by define properties for the `helpers` object with the editor below. Here's an example:

```javascript
helpers['hello'] = () => 'hello world'
```

Also you can get the column value with the first parameter:

```javascript
helpers['hello'] = (val) => `hello ${val}`
helpers['addTwo'] = (val) => Number(val) + 2
```

For convenience, feel free to use lodash object `_` in your custom helper. You can visit [lodash doc website](https://lodash.com/docs) to view all usable methods.

```javascript
helpers['camel'] = (val) => _.camelCase(val)
helpers['kebab'] = (val) => _.kebabCase(val)
```
