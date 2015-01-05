giffy
=====
Giffy is a library which allows you to open special image links as modals.

<h3>Instructions</h3>

Giffy does not require any other external libraries to use. To use the library, simply download and link the giffy.js file and initialize giffy. To custom style the giffy elements or the modal, simply edit the giffy.js or create another stylesheet and link it to the main page.

<h3>HTML</h3>

To use giffy, simply modify the anchor tag by adding a class of giffy, and setting the data-link to your image

```html
<a class = "giffy" href = "#" data-link = "example.gif">example</a>

```

<h3>CSS</h3>

To customize giffy, you can create another css file which targets the giffy elements

```css

.giffy{

	text-decoration:none;
	color:#3498db;

}

```


<h3>JS</h3>

Initializing giffy is fairly easy.

```js

giffy.init();

```
