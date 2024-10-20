// canvas para o mapa -> fica fixo 
const canvas_m = document.getElementById('canvas_mapa')
const c = canvas_m.getContext('2d')

// canvas para os defensores e invasores -> fica sendo redesenhado
const dcv = document.getElementById('dcv');
const d = dcv.getContext('2d');
const startButton = document.getElementById('startButton');
    
canvas_m.width = 960
canvas_m.height = 576

c.fillStyle = 'bisque'
c.fillRect(0, 0, canvas_m.width, canvas_m.height)

//função para visualizar as coisas provisoriamente (para debug e teste das coisas)
const visu_temp = () => {
    //visualizar os pontos de referência
    mapaUm.map( pos => {
        c.fillStyle = 'gray' 
        c.fillRect(pos.x, pos.y, 48, 48);  
    })

    // visualizar posiçoes
    pos_defensor1.map( pos => {
        c.fillStyle = 'rgba(255, 255, 255, 0.05) ' 
        c.fillRect(pos.x, pos.y, 48, 48);  
    })

    //visualizar personagens para escolher
    pers_disponiveis.map( pos => {

        if(pos.nome == "Defensor 1"){
            c.fillStyle = 'rgba(0, 0, 500, 0.5)' 
            c.fillRect(pos.x, pos.y, 48, 48);  
        }else if(pos.nome == "Defensor 2"){
            c.fillStyle = 'rgba(255, 0, 0, 0.5)' 
            c.fillRect(pos.x, pos.y, 48, 48)
        }else{
            c.fillStyle = 'rgba(0, 300, 0, 0.5)' 
            c.fillRect(pos.x, pos.y, 48, 48)
        }

        c.strokeStyle = 'black'
        c.lineWidth = 2 
        c.strokeRect(pos.x, pos.y, 48, 48)

        c.fillStyle = 'black'
        c.font = '9px Arial' 
        c.textAlign = 'center' 
        c.textBaseline = 'middle' 
        c.fillText(pos.nome, pos.x + 24, pos.y + 24) 
    })
    
}

//inserção do mapa
const image = new Image()
image.onload = () => {
    c.drawImage(image, 0, 0, canvas_m.width, canvas_m.height)
    visu_temp()
}
image.src = 'img/mapa01.png'

startButton.addEventListener('click', () => {
    startButton.style.display = 'none'

// função de iniciar o jogo
async function iniciar(){

    //resultado da primeira escolha do jogador, podendo adicionar 5 defensores com 6 moedas disponíveis
    const escolha1 = await escolhaDefensores(5, 6, [], pos_defensor1, pers_disponiveis) 

    //inimigos da horda 1
    const horda1 = Object.freeze([
        {nome: "GreenEyes", vida: 3, ataque: 2, x: 28, y: 124, dir: 0},
        {nome: "RedEyes", vida: 10, ataque: 3, x: -68, y: 124, dir: 0},
        {nome: "RedEyes", vida: 10, ataque: 3, x: -164, y: 124, dir: 0},
        {nome: "GreenEyes", vida: 3, ataque: 2, x: -260, y: 124, dir: 0},
        {nome: "Phantom", vida: 20, ataque: 4, x: -356, y: 124, dir: 0},
    ])

    // ini: inimigo que já está na tela
    const ini = horda1.slice(0, 1)
    // final: inimigos que ainda vão aparecer
    const final = horda1.slice(1, horda1.length)

    //resultado da primeira horda, que começou com 10 de vida
    const r_horda1 = await horda(ini, 10, escolha1.moedas, final, escolha1.defensores)
    console.log("Vida : ", r_horda1.vida)
    console.log("Moedas : ", r_horda1.moedas)

    const horda2 = Object.freeze([
        {nome: "GreenEyes", vida: 6, ataque: 4, x: 28, y: 124, dir: 0},
        {nome: "RedEyes", vida: 20, ataque: 6, x: -68, y: 124, dir: 0},
        {nome: "RedEyes", vida: 20, ataque: 6, x: -164, y: 124, dir: 0},
        {nome: "GreenEyes", vida: 6, ataque: 4, x: -260, y: 124, dir: 0},
        {nome: "Phantom", vida: 40, ataque: 8, x: -356, y: 124, dir: 0},
    ])

    // ini: inimigo que já está na tela
    const ini2 = horda2.slice(0, 1)
    // final: inimigos que ainda vão aparecer
    const final2 = horda2.slice(1, horda2.length)

    //resultado da primeira horda, que começou com 10 de vida
    const r_horda2 = await horda(ini2, 10, escolha1.moedas, final2, escolha1.defensores)
    console.log("Vida : ", r_horda2.vida)
    console.log("Moedas : ", r_horda2.moedas)
}
document.getElementById('overlay').style.display = 'none'
iniciar ()
});
