var classNames = ['icons-a', 'icons-b', 'icons-c', 'icons-d', 'icons-e'];
var delays = [2275, 2500, 2725, 2950, 3175];

classNames.forEach((className, index) => {
   setTimeout(() => {
       var elements = document.querySelectorAll('.' + className);
       for (var i = 0; i < elements.length; i++) {
           elements[i].classList.remove(className);
           elements[i].classList.add('icon-js');
       }
   }, delays[index]);
});