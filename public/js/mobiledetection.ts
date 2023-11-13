function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Samsung|LG|Sony|Nokia|HTC|Windows Phone|Kindle|PlayBook|BB10|BlackBerry|ZuneWP7|ZuneWP7.5|ZuneWP8|ZuneWP8.5|ZuneWP10|Silk/i.test(navigator.userAgent);
};

window.onload = function() {
    if(isMobileDevice()) {
        var element = document.querySelector(".header-height");
        element.className = "mobile-header-height";
    }
};