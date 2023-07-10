$(document).ready(function () {
    var $carousel2amb = $('.carousel-departamentos #departamento2 .galeria-2amb');
    var $carousel3amb = $('.carousel-departamentos #departamento3 .galeria-3amb');
    var $carousel4amb = $('.carousel-departamentos #departamento4 .galeria-4amb');

    function activateCarousel($carousel) {
        if ($(window).width() < 768) {
            if (!$carousel.hasClass('slick-initialized')) {
                $carousel.slick({
                    arrows: false,
                    dots: true,
                    adaptiveHeight: true // Permite la adaptación de altura automática del carrusel
                });
            }
            $carousel.show(); // Mostrar el carrusel cuando es necesario
        } else {
            $carousel.show(); // Mostrar las imágenes en pantallas grandes
            if ($carousel.hasClass('slick-initialized')) {
                $carousel.slick('unslick');
            }
        }
    }

    // Activa los carruseles al cargar la página
    activateCarousel($carousel2amb);
    activateCarousel($carousel3amb);
    activateCarousel($carousel4amb);

    // Vuelve a activar/desactivar los carruseles al cambiar el tamaño de la pantalla
    $(window).on('resize', function () {
        activateCarousel($carousel2amb);
        activateCarousel($carousel3amb);
        activateCarousel($carousel4amb);
    });
});
