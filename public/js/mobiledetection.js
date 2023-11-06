function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

window.onload = function() {
    if(isMobileDevice()) {
        var element = document.querySelector(".header-height");
        element.className = "mobile-header-height";
    }
};