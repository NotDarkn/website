// phind.com code
window.addEventListener('resize', function() {
    let isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|Mobi/i.test(navigator.userAgent);
    let header = document.querySelector('.header-height');
    if (isMobileDevice) {
        header.classList.remove('header-height');
        header.classList.add('mobile-header-height');
    } else {
        header.classList.remove('mobile-header-height');
        header.classList.add('header-height');
    }
 });