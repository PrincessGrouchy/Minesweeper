// Stolen directly from https://stackoverflow.com/questions/2625210/long-press-in-javascript
var node = document.getElementsByTagName("p")[0];
var longpress = false;
var presstimer = null;
var longtarget = null;

var cancel = function(e) {
    if (presstimer !== null) {
        clearTimeout(presstimer);
        presstimer = null;
    }

    this.classList.remove("longpress");
};

var click = function(e) {
    if (presstimer !== null) {
        clearTimeout(presstimer);
        presstimer = null;
    }

    this.classList.remove("longpress");

    if (longpress) {
        return false;
    }
    card_click_cb(s, card, i);
    // alert("press");
};

var start = function(e) {
    console.log(e);

    if (e.type === "click" && e.button !== 0) {
        return;
    }

    longpress = false;

    this.classList.add("longpress");

    if (presstimer === null) {
        presstimer = setTimeout(function() {
            // alert("long click");
            card_long_click_cb(s, card, i);
            longpress = true;
            
        }, 1000);
    }

    return false;
};