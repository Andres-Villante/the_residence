$(document).ready(function() {
    var touchStartX = 0;

    // Obtener la posición inicial del toque en dispositivos móviles
    $("#carouselExampleCaptions").on("touchstart", function(event) {
        touchStartX = event.touches[0].clientX;
    });

    // Detectar el deslizamiento del toque en dispositivos móviles
    $("#carouselExampleCaptions").on("touchmove", function(event) {
        var touchEndX = event.touches[0].clientX;
        var touchDiff = touchStartX - touchEndX;

        if (touchDiff > 0) {
            $(this).carousel("next");
        } else if (touchDiff < 0) {
            $(this).carousel("prev");
        }
    });

    // Habilitar el deslizamiento del carrusel al mover el cursor hacia la derecha o izquierda en cualquier dispositivo
    $("#carouselExampleCaptions").on("wheel", function(event) {
        if (event.originalEvent.deltaY > 0) {
            $(this).carousel("next");
        } else {
            $(this).carousel("prev");
        }
    });
});
