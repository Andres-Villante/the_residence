$(document).ready(function () {
    $('button').click(function () {
        var targetId = $(this).data('target');
        var target = $('#' + targetId);

        $('html, body').animate({
            scrollTop: target.offset().top
        }, 1000);
    });
});
