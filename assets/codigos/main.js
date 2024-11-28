const estado = {
    view: {
        pedacos: document.querySelectorAll(".mini-pedaco"),
        enemy: document.querySelector(".enemy"),
        tempo: document.querySelector("#tempoRestante"),
        ponto: document.querySelector("#pontos"),
        vida: document.querySelector("#vida"),
        botaoParar: document.querySelector(".parar"),
        botaoReiniciar: document.querySelector(".reiniciar")
    }, 
    values: {
        timerId: null,
        tempoRestanteId: setInterval(decrementaTempo, 1000),
        tempoRalph: 600,
        posicaoEnemy: 0,
        resultadoPositivo: 0,
        resultadoNegativo: 3,
        tempoAtual: 60,
    },
}

function selecaoAleatoria() {
    estado.view.pedacos.forEach((pedaco) => {
        pedaco.classList.remove("enemy")
    })

    let numeroAleatorio = Math.floor(Math.random()*9)
    let pedacoAleatorio = estado.view.pedacos[numeroAleatorio]
    pedacoAleatorio.classList.add("enemy")
    estado.values.posicaoEnemy = pedacoAleatorio.id
}

function moverEnemy() {
    estado.values.timerId = setInterval(selecaoAleatoria, estado.values.tempoRalph)
    estado.view.botaoParar.addEventListener('click', () => {
        clearInterval(estado.values.timerId)
    })
    estado.view.botaoReiniciar.addEventListener('click', () => {
        estado.values.timerId = setInterval(selecaoAleatoria, estado.values.tempoRalph)
    })
}

function decrementaTempo() {
    estado.values.tempoAtual -= 1
    estado.view.tempo.innerHTML = estado.values.tempoAtual
    if (estado.values.tempoAtual <= 0) {
        alert(`O tempo acabou! Sua pontuação ${estado.values.resultadoPositivo}`)
        estado.view.tempo.innerHTML = 60
        estado.values.tempoAtual = 60
    }
}

function tocarSom() {
    let som = new Audio('../audios/hit.m4a')
    Audio.play()
}

function addListenerClique() {
    estado.view.pedacos.forEach((pedaco) => {
        pedaco.addEventListener("mousedown", () => {
            if (pedaco.id === estado.values.posicaoEnemy) {
               estado.values.resultadoPositivo += 1
               estado.view.ponto.innerHTML = `${estado.values.resultadoPositivo}`
               estado.values.posicaoEnemy = null
               tocarSom()
            }
            else {
                estado.values.resultadoNegativo -=1
                estado.view.vida.innerHTML = `x${estado.values.resultadoNegativo}`
            }
        })
    })
}

function main() {   
    moverEnemy() 
    addListenerClique()
}


main()