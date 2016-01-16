(function($) {
    var html = ['<div id="voz-next-box" title="Voz Next Page Widget (#ReeganExE)">',
            '  <a href="#" id="z-pre-page" z-rel="prev"><img id="voz-pre" src="https://cdn3.iconfinder.com/data/icons/basic-flat-svg/512/svg10-512.png" /></a>',
            '  <a href="#" id="z-next-page" z-rel="next"><img src="https://cdn3.iconfinder.com/data/icons/basic-flat-svg/512/svg10-512.png" /></a>',
            '</div>'
        ].join('\n'),
        $window = $(window),
        $box;

    if (document.querySelector('[rel="next"],[rel="prev"]')) {
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

    $('a[href^="/redirect/index.php"]').each(function() {
        var href = this.href;
        this.href = decodeURIComponent(href.substr(href.indexOf('link=') + 5));
    })

    function getPos() {
        var pos = localStorage.getItem('pos');
        if (pos) {
            return JSON.parse(pos);
        }
    }

})(jQuery);
