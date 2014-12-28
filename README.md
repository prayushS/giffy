giffy
=====
Giffy is a library which allows you to open special image links as modals.

<h3>Instructions</h3>

Giffy does not require any other external libraries to use. To use the library, simply download and link the giffy.css and giffy.js files. To custom style the giffy elements or the modal, simply edit the giffy.css/ giffy.js or create another stylesheet and link it to the main page.

<h3>HTML</h3>

To use giffy, simply modify the anchor tag by adding a class of giffy, and setting the data-link to your image

```html
<a class = "giffy" href = "#" data-link = "example.gif">example</a>

```

<h3>CSS</h3>

To customize giffy, you can either edit the giffy.css file or create another css file targeting the giffy elements.

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
