// Stolen directly from https://stackoverflow.com/questions/2625210/long-press-in-javascript
var longpress = false;
var presstimer = null;
var longtarget = null;

var coolCancel = function(e) {
    if (presstimer !== null) {
        clearTimeout(presstimer);
        presstimer = null;
    }

    this.classList.remove("longpress");
};

var coolClick = function(s, card, i) {
    if (presstimer !== null) {
        clearTimeout(presstimer);
        presstimer = null;
    }

    card.classList.remove("longpress");

    if (longpress) {
        return false;
    }
    console.log("short press:");
    card_click_cb(s, card, i);
};

var coolStart = function(e, s, card, i) {
    // console.log(e);
    if (e.type === "click" && e.button !== 0) {
        return;
    }
    longpress = false;
    card.classList.add("longpress");
    if (presstimer === null) {
        presstimer = setTimeout(function() {
            alert("long click");
            console.log("long press:");
            card_long_click_cb(s, card, i);
            longpress = true;
            
        }, 1000);
    }
    return false;
};