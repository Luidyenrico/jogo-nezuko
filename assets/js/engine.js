const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector("enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {
        
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 10,
    },
    actions: {
        timerId: setInterval(randomSquare, 500),
        countDownTimerId: setInterval(countDown, 1000),
    }
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0) {
        alert("O TEMPO ACABOU!\n O seu resultado foi: " + state.values.result)
        clearInterval(state.actions.countDownTimerId)
        clearInterval(state.actions,timerId)
        state.values.result = 0
    }
}

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy")
    })

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}


function addListenerHitbox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition) {
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
            }
        })
    })
}

function initialize() {
    addListenerHitbox();
}

initialize();