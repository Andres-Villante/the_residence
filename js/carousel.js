$(document).ready(function() {
    var touchStartX = 0;

    $("#carouselExampleCaptions").on("touchstart", function(event) {
        touchStartX = event.touches[0].clientX;
    });

    $("#carouselExampleCaptions").on("touchmove", function(event) {
        var touchEndX = event.touches[0].clientX;
        var touchDiff = touchStartX - touchEndX;

        if (touchDiff > 0) {
            $(this).carousel("next");
        } else if (touchDiff < 0) {
            $(this).carousel("prev");
        }
    });

    $("#carouselExampleCaptions").on("wheel", function(event) {
        if (event.originalEvent.deltaY > 0) {
            $(this).carousel("next");
        } else {
            $(this).carousel("prev");
        }
    });
});
