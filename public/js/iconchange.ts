var classNames = ['icons-a', 'icons-b', 'icons-c', 'icons-d', 'icons-e'];
var delays = [3775, 4000, 4225, 4450, 4675];

classNames.forEach((className, index) => {
   setTimeout(() => {
       var elements = document.querySelectorAll('.' + className);
       for (var i = 0; i < elements.length; i++) {
           elements[i].classList.remove(className);
           elements[i].classList.add('icon-js');
       }
   }, delays[index]);
});