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
        hitPositionOld: 0,
        result: 0,
        currentTime: 30,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
}


function countDown() {
    if (state.values.currentTime < 1) {
        alert("O TEMPO ACABOU!\nO seu resultado foi: " + state.values.result);
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        window.location.reload();
        state.values.result = 0;
    } else {
        state.values.currentTime--;
        state.view.timeLeft.textContent = state.values.currentTime;
    }
}

function Retorna_Posicao_Diferente_da_anterior() {
    let randomNumber = Math.floor(Math.random() * 9);
    
    if (state.values.hitPositionOld != 0) {
        let idEnemy = state.values.hitPositionOld;
        if (randomNumber == idEnemy) {
            randomNumber = idEnemy+1;
            if(randomNumber === 9){
                randomNumber = 1;
            }            
        }
    }
    return randomNumber;
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy")
    })

    let randomNumber = Retorna_Posicao_Diferente_da_anterior();

    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
    state.values.hitPositionOld = randomNumber;

}

function Define_Dificuldade() {

    let pontuacao = parseFloat(state.view.score.textContent)

    if (pontuacao <= 3) {
        return 1000
    } else if (pontuacao > 3 && pontuacao <= 7) {
        return 800
    } else if (pontuacao > 7 && pontuacao <= 12) {
        return 700
    } else if (pontuacao > 12 && pontuacao <= 18) {
        return 600
    } else if (pontuacao > 18 && pontuacao <= 23) {
        return 500
    } else if (pontuacao > 23) {
        return 400
    }
}

function Atualiza_Dificuldade() {
    const interval = Define_Dificuldade();
    if (interval !== state.values.gameVelocity) {
        clearInterval(state.actions.timerId);
        state.values.gameVelocity = interval;
        state.actions.timerId = setInterval(randomSquare, interval);
    }
}

function addListenerHitbox() {
    state.view.squares.forEach((square) => {
        
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                Atualiza_Dificuldade()
            }
        })
    })
}

function initialize() {
    alert("Clique em OK para iniciar o jogo.")
    addListenerHitbox();
}

initialize();
