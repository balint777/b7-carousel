[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg?style=flat-square)](https://www.webcomponents.org/element/balint777/b7-carousel)
[![Published on Vaadin Directory](https://img.shields.io/badge/Vaadin%20Directory-published-00b4f0.svg?style=flat-square)](https://vaadin.com/directory/component/balint777b7-carousel)
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

# Basic b7-carousel demo
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

# Customized b7-carousel demo
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
<style>
	/**
		* Just a custom chevron
		*/
	b7-carousel#customized .chevron {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 3em;
		color: black;
		font-size: 2em;
		font-family: monospace;
		transition: color 1s ease-in-out;
	}
	b7-carousel#customized .chevron:hover {
		color: #bbb;
	}
	
	/**
		* The b7-carousel does not make any assumptions on the size, the
		* type nor the number of items in the carousel, so you are free to
		* style and compose them.
		* There are a couble of things though you can not style. These
		* values are explicitly controlled by b7-carousel
		* - max-height
		* - max-width
		*/
	b7-carousel#customized > .item {
		margin: 0 1em;
		box-shadow: 0 .1em 1.5em rgba(0,0,0,0.2);
		/* b7-carousel items are flex aligned to the center by default */
		align-self: center;
	}
	b7-carousel#customized > div.item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
	}

	/**
		* Child elements of b7-carousel will receive a b7-visible class
		* whenever they are visible on the sceen. You can use this property
		* to create an enry-exit animation for your carousel items
		*/
	b7-carousel#customized > .item {
		opacity: 0;
		transform: perspective(10px) translateZ(-10px);
		transition:
			opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94),
			transform 1s cubic-bezier(0.075, 0.82, 0.165, 1);
	}
	b7-carousel#customized > .item.b7-visible {
		opacity: 1;
		transform: perspective(100px) translateZ(0px);
	}
	
</style>
<b7-carousel id="customized" style="height: 15em">
	<div slot="prev" class="chevron">&lt;</div>
	<div slot="next" class="chevron">&gt;</div>

	<img class="item" src="https://picsum.photos/100/100?image=10"/>
	<div class="item">
		<img src="https://picsum.photos/100/100?image=11"/>
		<p>The Rouge One</p>
	</div>
	<img class="item" src="https://picsum.photos/100/100?image=12"/>
	<img class="item" src="https://picsum.photos/100/100?image=13"/>
	<img class="item" src="https://picsum.photos/100/100?image=14"/>
	<img class="item" src="https://picsum.photos/100/100?image=15"/>
	<img class="item" src="https://picsum.photos/100/100?image=16"/>
	<ul class="item" style="padding: 2em">
		<li>I</li>
		<li>am</li>
		<li>a</li>
		<li>list</li>
	</ul>
	<img class="item" src="https://picsum.photos/100/100?image=17"/>
	<img class="item" src="https://picsum.photos/100/100?image=18"/>
	<img class="item" src="https://picsum.photos/100/100?image=19"/>
	<img class="item" src="https://picsum.photos/100/100?image=20"/>
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
