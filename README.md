[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg?style=flat-square)](https://www.webcomponents.org/element/balint777/b7-carousel)
[![Published on Vaadin  Directory](https://img.shields.io/badge/Vaadin%20Directory-published-00b4f0.svg?style=flat-square)](https://vaadin.com/directory/component/balint777b7-carousel)
[![Stars on vaadin.com/directory](https://img.shields.io/vaadin-directory/star/balint777b7-carousel.svg?style=flat-square)](https://vaadin.com/directory/component/balint777b7-carousel)


# \<b7-carousel\>
b7-carousel is a carousel designed for real-world use. It is a simplistic approach to a functionally complete carousel element.
The main design goal is to have a minimal performance footprint to be well fit for mobile devices.
The element features
* Native performance scrolling and paging
* A trivial API
* High level of customizability, with minimal assumptions to the use-cases
* Touch Scrolling
* Mouse scrolling
* Keyboard scrolling
* Responsive layout

## Dependencies
[Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Browser_compatibility)

# Demo
<!---
```
<custom-element-demo>
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="b7-carousel.html">
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<b7-carousel style="height: 10em">
  <img src="http://placekitten.com/g/640/480">
  <img src="http://placekitten.com/g/480/640">
  <img src="http://placekitten.com/g/600/640">
  <img src="http://placekitten.com/g/300/400">
  <img src="http://placekitten.com/g/200/400">
  <img src="http://placekitten.com/g/500/200">
  <img src="http://placekitten.com/g/640/480">
  <img src="http://placekitten.com/g/480/640">
  <img src="http://placekitten.com/g/600/640">
  <img src="http://placekitten.com/g/300/400">
  <img src="http://placekitten.com/g/200/400">
  <img src="http://placekitten.com/g/500/200">
</b7-carousel>
```

# Development guide
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
