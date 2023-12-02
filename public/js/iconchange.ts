var elements = document.querySelectorAll('icons-a, icons-b, icons-c, icons-d, icons-e');

setTimeout(() => {
 elements.forEach(element => {
   element.className = 'icon-js';
 });
}, 4650);
