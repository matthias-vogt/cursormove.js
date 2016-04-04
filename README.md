#cursormove.js

Emits events when mouse coordinates change.
The difference to `mousemove` is that it also triggers on scroll.

```
$(window).cursormove();

$(window).on("cursormove", function(e) {
    console.log(e.pageX, e.pageY);
});
```

[JS Bin Demo](https://jsbin.com/cugedu/)
<!--
##Installation
`npm i cursormove --save`
-->
##Motivation
`mousemove` events are heavily throttled while scrolling.
When you have fancy mouse parallax effects, you don't want them to be jumping around while scrolling.

##In development
This is currently in development, a stable version will release soon.
You're welcome to contribute :)