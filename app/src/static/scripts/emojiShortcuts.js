var Handler = {
    attach: function (document) {
        // Open emoji panel
        document.querySelector('#main > footer > div > button').click();

        this.coords = {
            i: 0,
            j: 0
        };

        // Emoji dimensions are 45 x 45
        var emojiDim = 45;
        var grandParent = document.querySelector('#main > footer > span > div > span > div');
        this.bounds = {
            x: Math.floor(grandParent.clientWidth / emojiDim),
            y: Math.floor(grandParent.clientHeight / emojiDim)
        };

        this.updateHighlighted();

        this.initialized = true;
    },
    updateHighlighted: function () {
        var par = document.querySelector('#main > footer > span > div > span > div > div');
        var target = par.childNodes[this.coords.x + this.coords.y * this.bounds.y];
        highlight(target)

    },
    detach: function (doc) {
        // Close emoji panel
        doc.querySelector('#main > footer > div > button').click();

        this.coords = {
            i: 0,
            j: 0
        };
        this.initialized = false;
    },
    handle: function (doc, e) {
        if (e.keyCode === 38 && e.ctrlKey && !this.initialized) {
            this.attach(doc)
        }

        if (this.initialized) {
            var par = document.querySelector('#main > footer > span > div > span > div > div');
            if (e.keyCode === 13 || e.keyCode === 27) {
                // on Escape or enter, close panel and detach
                par.childNodes[i][j].click();
                this.detach(doc);
            }
            else if (e.keyCode === 37) {
                // Left
            }
            else if (e.keyCode === 38) {
                // Up
            }
            else if (e.keyCode === 39) {
                // Right
            }
            else if (e.keyCode === 40) {
                // Down
            }
        }
    }
}


function KeyHandler(doc, e) {

    this._doc = doc;
}

function bindKeyListener(doc, e) {
    // nest functions and bind here
    // handleKey if ctrl + up pressed
    var fn = Handler.handle.bind(Handler, doc);
    var existingListener = doc.onkeydown;
    doc.onkeydown = function(e){
        existingListener(e);
        fn(e);
    }
}
