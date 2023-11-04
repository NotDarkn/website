function isMobile() {
    return /iPhone|iPad|iPod|Android|Windows Phone|webOS|BlackBerry|IEMobile|Opera Mini|Mobile Safari|Mobile Chrome|Kindle|Silk|BB10|PlayBook|SymbianOS|Maemo|Meego|Bada|Windows Mobile|UP.Browser|UCWEB|Skyfire|Dolfin|Fennec|Mobile|Tablet|Touch|WAP|Mini/i.test(navigator.userAgent);
}

var imageElement = document.getElementById("sakamatoImage");

if (isMobile()) {
    imageElement.src = "img/sakamato-alt.PNG";
}