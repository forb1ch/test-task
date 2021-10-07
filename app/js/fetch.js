let parseUrl = (function(url) { return new URL(url) });
let obj = parseUrl('http://ffwagency.com/do/any.php?a=1#foo');

console.log(obj.hash); // -> #foo
console.log(obj.hostname) // -> ffwagency.com
console.log(obj.pathname) // -> do/any.php
