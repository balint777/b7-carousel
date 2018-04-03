# \<b7-carousel\>

## Dependencies
[Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Browser_compatibility)

# Demo
<!--
```
<custom-element-demo>
  <template>
    <link rel="import" href="b7-carousel.html">
  </template>
</custom-element-demo>
```
-->
```html
<b7-carousel>
    <img src="http://placekitten.com/g/640/480"/>
    <img src="http://placekitten.com/g/480/640"/>
    <img src="http://placekitten.com/g/600/640"/>
    <img src="http://placekitten.com/g/300/400"/>
    <img src="http://placekitten.com/g/200/400"/>
    <img src="http://placekitten.com/g/500/200"/>
</b7-carousel>
```

# Developing guide
## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed. Then run `polymer serve` to serve your element locally.

## Viewing Your Element

```
$ polymer serve
```

## Running Tests

```
$ polymer test
```

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run your application's test suite locally.
