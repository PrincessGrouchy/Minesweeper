window.addEventListener('load', main);

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
        card.addEventListener("click", () => {
            card_click_cb(s, card, i);
        });
        grid.appendChild(card);
    }
}

/**
* updates DOM to reflect current state
* - hides unnecessary cards by setting their display: none
* - adds "flipped" class to cards that were flipped
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
    grid.style.gridTemplateColumns = `repeat(${s.cols}, 1fr)`;
    for (let i = 0; i < grid.children.length; i++) {
        const card = grid.children[i];
        const index = Number(card.getAttribute("data-cardInd"));
        const currCol = index % gameStatus.ncols;
        const currRow = index / gameStatus.ncols;
        if (index >= s.rows * s.cols) {
            card.style.display = "none";
        }

        // else {
        //     card.style.display = "block";
        //     if (s.onoff[ind])
        //         card.classList.add("flipped");
        //     else
        //         card.classList.remove("flipped");
        // }
    }
    // document.querySelectorAll(".moveCount").forEach(
    //     (e) => {
    //         e.textContent = String(s.moves);
    //     });
    document.querySelectorAll(".bombCount").forEach(
        (e) => {
            e.textContent = String(gameStatus.nmines - gameStatus.nmarked);
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
    const col = ind % s.cols;
    const row = Math.floor(ind / s.cols);
    card_div.classList.toggle("flipped");
    flip(s, col, row);
    s.moves++;
    render(s);
    // check if we won and activate overlay if we did
    if (s.onoff.reduce((res, l) => res && !l, true)) {
      document.querySelector("#overlay").classList.toggle("active");
    }
    clickSound.play();
}

    
function gameStartButtonClick(s, cols, rows, bombs) {
    // s.cols = cols;
    // s.rows = rows;
    // make_solvable(s);

    // call to msgame 
    s.init(cols, rows, bombs);

    render(s);
}

function main() {
    let game = new MSGame();

    // get browser dimensions - not used in thise code
    let html = document.querySelector("html");
    console.log("Your render area:", html.clientWidth, "x", html.clientHeight)

    // register callbacks for buttons
    document.querySelectorAll(".menuButton").forEach((button) => {
        [rows, cols, bombs] = button.getAttribute("data-size").split("x").map(s => Number(s));
        // button.innerHTML = `${cols} &#x2715; ${rows} &#x2715; ${bombs}`
        // button.addEventListener("click", button_cb.bind(null, state, cols, rows));
        button.addEventListener("click", gameStartButtonClick.bind(null, game, cols, rows, bombs));

    });

    // // callback for overlay click - hide overlay and regenerate game
    // document.querySelector("#overlay").addEventListener("click", () => {
    //   document.querySelector("#overlay").classList.remove("active");
    //   make_solvable(state);
    //   render(state);
    // });

    // // sound callback
    // let soundButton = document.querySelector("#sound");
    // soundButton.addEventListener("change", () => {
    //   clickSound.volume = soundButton.checked ? 0 : 1;
    // });


    // create enough cards for largest game and register click callbacks
    prepare_dom(game);

    // simulate pressing 4x4 button to start new game
    gameStartButtonClick(game, 10, 8, 10);
}