window.addEventListener('load', main);
let clickSound = new Audio("sounds/clunk.mp3");
let boomSound = new Audio("sounds/1 booom.wav");
let pooshSound = new Audio("sounds/poosh.wav");

// var start;
// var longpress = 1300; // i dunno if these need to be global?? js is confusing

// var longpress = false;
// var presstimer = null;
// var longtarget = null;

// var taptimer = false;
var isTapHold = false;
// /**
//  * flips a single card (if coordinates valid)
//  * 
//  * @param {state} s 
//  * @param {number} col 
//  * @param {number} row 
//  */
// function flip(s, col, row) {
//     // if (col >= 0 && col < s.getStatus().cols
//     //     && row >= 0 && row < s.getStatus().rows) {
//     s.uncover(row, col);
//     // console.log("tried to uncover" + col + "," + row);
//     // render(s);
//     // if (s.onoff == false) {
//     // s.onoff[row * s.rows + col] = !s.onoff[row * s.rows + col];
//     // }
// }

/**
* creates enough cards for largest board -(9x9)- 
* 18x14
* registers callbacks for cards
* 
* @param {state} s 
*/
function prepare_dom(s) {
    const grid = document.querySelector(".grid");
    const nCards = 18 * 14; // max grid size
    for (let i = 0; i < nCards; i++) {
        const card = document.createElement("div");
        card.className = "card";
        card.setAttribute("data-cardInd", i);
        // card.addEventListener("click", () => {
        //     card_click_cb(s, card, i);
        // });
        // card.addEventListener("contextmenu", (e) => {
        //     card_long_click_cb(s, card, i);
        //     e.preventDefault(); //no right-click menu hopefully?
        // });
        /////////////////////
        jQuery(card).on("tap", function (e) { card_click_cb(s, card, i); })
        jQuery(card).on("taphold", function (e) { card_long_click_cb(s, card, i); })
        /////////////////////////https://stackoverflow.com/questions/10502383/jquery-calling-click-event-after-taphold-event
        // card.addEventListener('vmousedown vmouseup', function(e){
        //     if (e.type == 'vmousedown') {
        //         //set the timer to run the `taphold` function in three seconds
        //         tapTimer = setTimeout(function () {
        //             isTapHold = true;
        //             card_long_click_cb(s, card, i);
        //         }, 1000);
        //     } else {
        //         //event.type == 'vmouseup'
        //         //clear the timeout if it hasn't yet occured
        //         clearTimeout(tapTimer);    
        
        //         //if the flag is set to false then this is a `tap` event
        //         if (!isTapHold) {
        //             //this is a tap, not a tap-hold
        //             card_click_cb(s, card, i);
        //         }
        
        //         //reset flag
        //         isTapHold = false;
        //     }
        // });
        /////////////// stolen from https://codepen.io/thetallweeks/pen/uAEGr
        // card.addEventListener('mousedown', function (e) {
        //     delay = setTimeout(check, longpress);

        //     function check() {
        //         card_long_click_cb(s, card, i);
        //     }
        //     card_click_cb(s, card, i);

        // }, true);
        // card.addEventListener('mouseup', function (e) {
        //     // On mouse up, we know it is no longer a longpress
        //     clearTimeout(delay);
        // });
        // card.addEventListener('mouseout', function (e) {
        //     clearTimeout(delay);
        // });
        //////////////////////////////// https://stackoverflow.com/questions/14586883/how-to-detect-a-long-press-on-a-div-in-jquery
        // jQuery(card).on('mousedown', function (e) {
        //     start = new Date().getTime();

        // });

        // jQuery(card).on('mouseleave', function (e) {
        //     start = 0;
        // });

        // jQuery(card).on('mouseup', function (e) {
        //     if (new Date().getTime() >= (start + longpress)) {
        //         card_long_click_cb(s, card, i);
        //     } else {
        //         card_click_cb(s, card, i);
        //     }
        // });
        /////////////////////////////////https://stackoverflow.com/questions/2625210/long-press-in-javascript
        // card.classList = "card";
        // card.addEventListener("mousedown", function (e) {
        //     // console.log(e);
        //     // if (e.type === "click" && e.button !== 0) {
        //     //     return;
        //     // }
        //     longpress = false;
        //     card.classList.add("longpress");
        //     if (presstimer === null) {
        //         presstimer = setTimeout(function () {
        //             console.log("long press: mouse");
        //             card_long_click_cb(s, card, i);
        //             longpress = true;

        //         }, 1000);
        //     }
        //     return false;
        // });
        // card.addEventListener("touchstart", function (e) {
        //     // console.log(e);
        //     // if (e.type === "click" && e.button !== 0) {
        //     //     return;
        //     // }
        //     longpress = false;
        //     card.classList.add("longpress");
        //     if (presstimer === null) {
        //         presstimer = setTimeout(function () {
        //             console.log("long press: touchstart");
        //             card_long_click_cb(s, card, i);
        //             longpress = true;

        //         }, 1000);
        //     }
        //     return false;
        // });
        // card.addEventListener("mouseup", function (e) {
        //     if (e.type === "click" && e.button === 2) {
        //         console.log("long press: mouseup");
        //         card_long_click_cb(s, card, i);
        //         return;
        //     }
        //     console.log(e.button, "e button");
        //     if (presstimer !== null) {
        //         clearTimeout(presstimer);
        //         presstimer = null;
        //     }
        //     card.classList.remove("longpress");
        //     if (longpress) {
        //         return false;
        //     }
        //     if (e.button === 0) {
        //         console.log("short press: click");
        //         card_click_cb(s, card, i);
        //     }
        // });
        // card.addEventListener("mouseout", coolCancel);
        // card.addEventListener("touchend", coolCancel);
        // card.addEventListener("touchleave", coolCancel);
        // card.addEventListener("touchcancel", coolCancel);
        ///////////////////////////////////////////
        grid.appendChild(card);
    }
}

/**
* updates DOM to reflect current state
* - hides unnecessary cards by setting their display: none
* 
* @param {object} s 
*/
function render(s) {
    console.log("in Render");
    const gameStatus = s.getStatus();
    const gameRender = s.getRendering();
    console.log(gameRender.join("\n"));
    console.log(gameStatus);
    const grid = document.querySelector(".grid");
    grid.style.gridTemplateColumns = `repeat(${gameStatus.ncols}, 1fr)`;
    for (let i = 0; i < grid.children.length; i++) {
        const card = grid.children[i];
        const index = Number(card.getAttribute("data-cardInd"));
        const currCol = index % gameStatus.ncols; //is this actually ROW???
        const currRow = Math.floor(index / gameStatus.ncols);
        let state = "none";
        // if (index >= s.rows * s.cols) {
        if (index >= gameStatus.nrows * gameStatus.ncols) {
            card.style.display = state;
        }
        else {
            state = gameRender[currRow][currCol]; //jesus? wtf is this switched?
            // console.log(state, i, "State is")
            card.style.display = "block";
            // console.log(state + " state of " + i);
            //      "H" = hidden cell - no bomb
            //      "F" = hidden cell with a mark / flag
            //      "M" = uncovered mine (game should be over now)
            // '0'..'9' = number of mines in adjacent cells
            if (state === "H") {
                card.classList.add("hidden");
                card.classList.remove("flag");
                card.classList.remove("exploded");
                card.classList.remove("number");
            }
            else if (state === "F") {
                card.classList.remove("hidden");
                card.classList.add("flag");
                card.classList.remove("exploded");
                card.classList.remove("number");
            }
            else if (state === "M") {
                card.classList.remove("hidden");
                card.classList.remove("flag");
                card.classList.add("exploded");
                card.classList.remove("number");
            }
            else {
                card.classList.remove("hidden");
                card.classList.remove("flag");
                card.classList.remove("exploded");
                card.classList.add("number");
                card.setAttribute("data-number", state); //numbers 0-9 only
            }
        }
    }
    document.querySelectorAll(".bombCount").forEach(
        (e) => {
            e.textContent = String(gameStatus.nmarked) + " marked/"
                + String(gameStatus.nmines - gameStatus.nmarked) + " remaining";
        });
}

/**
 * callback for clicking a card
 * - toggle surrounding elements
 * - check for winning condition
 * @param {state} s 
 * @param {HTMLElement} card_div 
 * @param {number} ind 
 */
function card_click_cb(s, card_div, ind) {
    const gameStatus = s.getStatus();
    const col = ind % gameStatus.ncols;
    const row = Math.floor(ind / gameStatus.ncols);
    // card_div.classList.toggle("flipped");
    s.uncover(row, col);
    // s.moves++;
    render(s);
    checkWin(s);
    clickSound.play();

}

/**
 * callback for clicking a card
 * - toggle surrounding elements
 * - check for winning condition
 * @param {state} s 
 * @param {HTMLElement} card_div 
 * @param {number} ind 
 */
function card_long_click_cb(s, card_div, ind) {
    const gameStatus = s.getStatus();
    const col = ind % gameStatus.ncols;
    const row = Math.floor(ind / gameStatus.ncols);
    s.mark(row, col);
    render(s);
    checkWin(s);
    clickSound.play();
}

function checkWin(s) {
    // check if we won and activate overlay if we did
    const gameStatus = s.getStatus();

    if (gameStatus.exploded === true) {
        console.log("You lost");
        boomSound.play();
        timerPause();
        document.querySelector(".winOrLose").innerHTML = "lose";
        document.querySelector("#overlay").classList.toggle("active");
    }
    else if (gameStatus.done === true) {
        console.log("You won");
        pooshSound.play();
        timerPause();
        document.querySelector(".winOrLose").innerHTML = "win";
        document.querySelector("#overlay").classList.toggle("active");
    }
}

function gameStartButtonClick(s, cols, rows, bombs) {
    // s.cols = cols;
    // s.rows = rows;
    // make_solvable(s);

    // call to msgame 
    // I think this is swapped around, I'm getting rows and cols switched
    s.init(cols, rows, bombs);
    // timerReset()
    // timerStart();
    render(s);
}

function main() {
    let game = new MSGame();
    game.init(8, 10, 10);

    timerStart();

    // get browser dimensions - not used in thise code
    let html = document.querySelector("html");
    console.log("Your render area:", html.clientWidth, "x", html.clientHeight)

    // register callbacks for buttons
    document.querySelectorAll(".menuButton").forEach((button) => {
        [cols, rows, bombs] = button.getAttribute("data-size").split("x").map(s => Number(s));
        // button.innerHTML = `${cols} &#x2715; ${rows} &#x2715; ${bombs}`
        // button.addEventListener("click", button_cb.bind(null, state, cols, rows));
        button.addEventListener("click", gameStartButtonClick.bind(null, game, cols, rows, bombs));

    });

    // callback for overlay click - hide overlay and regenerate game
    document.querySelector("#overlay").addEventListener("click", () => {
        document.querySelector("#overlay").classList.remove("active");
        //clear game!
        timerReset();
        timerStart();
        gameStartButtonClick(game, 10, 8, 10);
        render(game);
    });

    // sound callback
    let soundButton = document.querySelector("#sound");
    soundButton.addEventListener("change", () => {
        clickSound.volume = soundButton.checked ? 0 : 1;
        boomSound.volume = soundButton.checked ? 0 : 1;
        pooshSound.volume = soundButton.checked ? 0 : 1;
    });


    // create enough cards for largest game and register click callbacks
    prepare_dom(game);

    // simulate pressing 4x4 button to start new game
    gameStartButtonClick(game, 10, 8, 10);
}