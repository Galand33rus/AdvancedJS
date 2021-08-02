'use strict';


let text = document.querySelector('.text').innerText;

let regexp = /'/g;
let regexp2 = /(\W)(')|(^)(')/g;

document.querySelector('.modified').innerText = text.replace(regexp, '"');
document.querySelector('.modified2').innerText = text.replace(regexp2, '$1"');


