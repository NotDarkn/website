var elements = document.querySelectorAll('.icons-a, .icons-b, .icons-c, .icons-d, .icons-e');

function changeClasses() {
   for (var i = 0; i < elements.length; i++) {
       elements[i].classList.remove('icons-a', 'icons-b', 'icons-c', 'icons-d', 'icons-e');
       elements[i].classList.add('icon-js');
   }
}

setTimeout(changeClasses, 4650);