$(document).ready(function() {
    $('.keyboard-normal').keyboard({
        layout: 'qwerty',
        autoAccept: 'true',
        usePreview: false,
        visible: function(e, keyboard, el) {
            // addNav(keyboard);
        },
        beforeClose: function(e, keyboard, el, accepted) {
            $('input.current').removeClass('current');
            $("body").css('padding-bottom', '0px');
        }
    });
});