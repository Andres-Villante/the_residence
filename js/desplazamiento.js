$(document).ready(function () {
    $('button').click(function () {
        var targetId = $(this).data('target'); // Usar .data() en lugar de .attr()
        var target = $('#' + targetId);

        $('html, body').animate({
            scrollTop: target.offset().top
        }, 1000); // 1000 milisegundos = 1 segundo
    });
});
