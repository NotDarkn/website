function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Samsung|LG|Sony|Nokia|HTC|Windows Phone|Kindle|PlayBook|BB10|BlackBerry|ZuneWP7|ZuneWP7.5|ZuneWP8|ZuneWP8.5|ZuneWP10|Silk/i.test(navigator.userAgent);
};

window.onload = function() {
    if(window.location.pathname === "/index.html" || window.location.pathname === "/404.html") {
        if(isMobileDevice()) {
            var element;
            if(window.location.pathname === "/index.html") {
                element = document.querySelector(".header-height");
                element.className = "mobile-header-height";
            } else if(window.location.pathname === "/404.html") {
                element = document.querySelector(".header-height-404");
                element.className = "mobile-header-height-404";
            }
        }
    }
 };