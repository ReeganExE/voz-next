(function($) {
    $.fn.nmap = Array.prototype.map;
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
    });


    var posts = $('.voz-postbit a[href*="showpost"]').nmap(function(a) { return new Post(a) }).reverse();

    function Post(el) {
        this.id = el.id;
        this.element = el;
        this.top = $(el).closest('table').offset().top;
    }

    Post.prototype.goto = function() {
        this.element.scrollIntoView();
    };

    Array.prototype.hasNext = function(i) {
        return ((i + 1) < this.length)
    };
    
    Array.prototype.last = function(i) {
        return this[this.length - 1];
    };

    function prePost() {
        var currentPosition = $(document).scrollTop();
        for (var i = 0; i < posts.length; i++) {
            var post = posts[i];
            if (currentPosition > post.top) {
                posts.hasNext(i) && posts[i + 1].goto();
                return;
            }
        }
    }

    function nextPost() {
        var currentPosition = $(document).scrollTop();
        for (var i = 0; i < posts.length; i++) {
            var post = posts[i];
            if (currentPosition > post.top) {
                i > 0 && posts[i - 1].goto();
                return;
            }
        }
        // goto the first posts
        posts.last().goto();
    }

    $(document).keydown(function(e) {
        var tag = e.target.tagName.toLowerCase();
        if (tag === 'input' || tag === 'textarea') {
            return;
        }
        if (e.which == 37) { // Left Arrow
            prePost();
        }

        if (e.which == 39) { // Right Arrow
            nextPost();
        }
    });



    function getPos() {
        var pos = localStorage.getItem('pos');
        if (pos) {
            return JSON.parse(pos);
        }
    }

})(jQuery);
