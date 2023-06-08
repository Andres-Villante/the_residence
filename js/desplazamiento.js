$(document).ready(function () {
    $('button').click(function () {
        var targetId = $(this).attr('data-target');
        var target = $('#' + targetId);

        $('html, body').animate({
            scrollTop: target.offset().top
        }, 1000); // 1000 milisegundos = 1 segundo
    });
});
