(function($) {
    var html = ['<div id="voz-next-box">',
            '  <a href="#" id="z-pre-page" z-rel="prev">Pre</a>',
            '  <a href="#" id="z-next-page" z-rel="next">Next</a>',
            '</div>'
        ].join('\n'),
        $window = $(window),
        $box;

    if (document.querySelector('[rel="next"]')) {
        $box = $(html).appendTo(document.body).on('click', 'a',
            function(e, a) {
                e.preventDefault();
                a = document.querySelector('[rel="' + this.getAttribute('z-rel') + '"]');
                a && a.click();
            }).draggable({
            stop: function(event, ui) {
                if (ui.position.top > $window.height()) {
                    $box.removeAttr('style');
                    localStorage.clear();
                } else {
                    // keep current location
                    localStorage.setItem('pos', JSON.stringify(ui.position))
                }
            }
        });
        var pos = getPos();
        pos && $box.css(pos);
    }

    function getPos() {
        var pos = localStorage.getItem('pos');
        if (pos) {
            return JSON.parse(pos);
        }
    }

})(jQuery);
