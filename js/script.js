const celulas = document.querySelectorAll("div.cell")
const player1 = "X"
const player2 = "O"
let checarTurno = true

const combinacoes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]
// Lendo o evento de click em cada célula do tabuleiro, e tendo como resposta o id da célula
document.addEventListener('click', (event) =>{
    if(event.target.matches(".cell")){
        jogar(event.target.id)
        checaVez()
    }
})

function jogar(id){
    const cell = document.getElementById(id)
    turno = checarTurno ? player1 : player2
    if(turno == player1){
        cell.classList.add("Xmark")
    }else{
        cell.classList.add("Omark")
    }
    cell.textContent = turno
    cell.classList.add(turno)
    checarVencedor(turno)
}

function checarVencedor(turno){
    const vencedor = combinacoes.some((comb) => {
        return comb.every((index) => {
            return celulas[index].classList.contains(turno)
        })
    })

    if(vencedor){
        encerraJogo(turno)
    }else if(checaEmpate()){
        encerraJogo()
    }else{
        checarTurno = !checarTurno
    }
}

function checaEmpate(){
    let x = 0
    let o = 0

    for(index in celulas){
        if(!isNaN(index)){
            if(celulas[index].classList.contains(player1)){
                x++
            }
            if(celulas[index].classList.contains(player2)){
                o++
            }
        }
    }
    return x + o === 9 ? true : false
}

function encerraJogo(vencedor = null){
    const telaWin = document.querySelector("#telaWin")
    const msgWin = document.querySelector("#msgWinner")
    const msgCont = document.querySelector("#contagem")
    telaWin.classList.add("mostrar")

    if(vencedor){
        if(vencedor == "X"){
            msgWin.innerHTML = `<p>O vencedor foi o <span class="Xmark">X</span></p>`
        }else{
            msgWin.innerHTML = `<p>O vencedor foi o <span class="Omark">O</span></p>`
        }
    }else{
        msgWin.innerHTML = `<p>Houve um empate!</p>`
    }
    let contador = 3
    setInterval(() => {
        msgCont.innerHTML = `<p id="contagem">Reiniciando em ${contador--}</p>`
    }, 1000)

    setTimeout(() => location.reload(), 4000)
}

function checaVez(turno){
    var mostrador = document.querySelector('#mostrador')
    mostrador.style.display = "none"
}
