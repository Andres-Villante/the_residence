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
                    adaptiveHeight: true 
                });
            }
            $carousel.show(); 
        } else {
            $carousel.show(); 
            if ($carousel.hasClass('slick-initialized')) {
                $carousel.slick('unslick');
            }
        }
    }

    activateCarousel($carousel2amb);
    activateCarousel($carousel3amb);
    activateCarousel($carousel4amb);

    $(window).on('resize', function () {
        activateCarousel($carousel2amb);
        activateCarousel($carousel3amb);
        activateCarousel($carousel4amb);
    });
});
