// canvas para o mapa -> fica fixo 
const canvas_m = document.getElementById('canvas_mapa')
const c = canvas_m.getContext('2d')

// canvas para os defensores e invasores -> fica sendo redesenhado
const dcv = document.getElementById('dcv');
const d = dcv.getContext('2d');

const tcanvas = document.getElementById('texto');
const t = tcanvas.getContext('2d');

const startButton = document.getElementById('startButton');

// Adicionando o botão de tutorial
const tutorialButton = document.getElementById('tutorial-Button');
const tutorialText = document.getElementById('tutorial-text');

// Adicionando um evento de clique no botão de tutorial
tutorialButton.addEventListener('click', function() {
    if (tutorialText.style.display === 'none') {
        tutorialText.style.display = 'block'; // Mostrar o texto
    } else {
        tutorialText.style.display = 'none'; // Esconder o texto
    }
});

c.fillStyle = 'bisque'
c.fillRect(0, 0, canvas_m.width, canvas_m.height)

//inserção do mapa
const image = new Image()
image.onload = () => {
    c.drawImage(image, 0, 0, canvas_m.width, canvas_m.height)
    // visualizar posiçoes
    pos_defensor1.map( pos => {
        c.fillStyle = 'rgba(255, 255, 255, 0.05) ' 
        c.fillRect(pos.x, pos.y, 48, 48);  
    })
}
image.src = 'img/mapa01.png'

startButton.addEventListener('click', () => {
    startButton.style.display = 'none'
    tutorialButton.style.display = 'none'; // Esconder o botão de tutorial
    tutorialText.style.display = 'none'; // Esconder o texto do tutorial

// função de iniciar o jogo
const iniciar = async () =>{

    //resultado da primeira escolha do jogador, podendo adicionar 5 defensores com 6 moedas disponíveis
    const escolha1 = await escolhaDefensores(6, [], pos_defensor1, pers_disponiveis, 10) 
    exibirComando(t, "Hora da Horda!", 20, 40)
    //inimigos da horda 1
    const horda1 = Object.freeze([
        {nome: "GreenEyes", vida: 80, tot_vida: 80, ataque: 2, x: 28, y: 124, dir: 0},
        {nome: "RedEyes", vida: 120, tot_vida: 120, ataque: 3, x: -68, y: 124, dir: 0},
        {nome: "RedEyes", vida: 120, tot_vida: 120, ataque: 3, x: -164, y: 124, dir: 0},
        {nome: "GreenEyes", vida: 80, tot_vida : 80, ataque: 2, x: -260, y: 124, dir: 0},
        {nome: "Phantom", vida: 160, tot_vida : 160, ataque: 4, x: -356, y: 124, dir: 0},
    ])

    // ini: inimigo que já está na tela
    const ini = horda1.slice(0, 1)
    // final: inimigos que ainda vão aparecer
    const final = horda1.slice(1, horda1.length)

    //resultado da primeira horda, que começou com 10 de vida
    const r_horda1 = await horda(ini, 10, escolha1.moedas, final, escolha1.defensores)

    const escolha2 = await escolhaDefensores(r_horda1.moedas, escolha1.defensores, escolha1.posicoes, pers_disponiveis, r_horda1.vida)

    const horda2 = Object.freeze([
        {nome: "GreenEyes", vida: 80, tot_vida: 80, ataque: 2, x: 28, y: 124, dir: 0},
        {nome: "GreenEyes", vida: 80, tot_vida: 80, ataque: 2, x: -68, y: 124, dir: 0},
        {nome: "GreenEyes", vida: 80, tot_vida: 80, ataque: 2, x: -164, y: 124, dir: 0},
        {nome: "RedEyes", vida: 120, tot_vida: 120, ataque: 3, x: -356, y: 124, dir: 0},
        {nome: "RedEyes", vida: 120, tot_vida: 120, ataque: 3, x: -430, y: 124, dir: 0},
        {nome: "RedEyes", vida: 120, tot_vida: 120, ataque: 3, x: -490, y: 124, dir: 0},
        {nome: "Phantom", vida: 160, tot_vida : 160, ataque: 4, x: -550, y: 124, dir: 0},
        {nome: "Phantom", vida: 160, tot_vida : 160, ataque: 4, x: -600, y: 124, dir: 0},
    ])

    // ini: inimigo que já está na tela
    const ini2 = horda2.slice(0, 1)
    // final: inimigos que ainda vão aparecer
    const final2 = horda2.slice(1, horda2.length)

    //resultado da primeira horda, que começou com 10 de vida
    const r_horda2 = await horda(ini2, r_horda1.vida, r_horda1.moedas, final2, escolha2.defensores)

    const escolha3 = await escolhaDefensores(r_horda2.moedas, escolha2.defensores, escolha2.posicoes, pers_disponiveis, r_horda2.vida)

    const horda3 = Object.freeze([
        {nome: "GreenEyes", vida: 80, tot_vida: 80, ataque: 2, x: 28, y: 124, dir: 0},
        {nome: "GreenEyes", vida: 80, tot_vida: 80, ataque: 2, x: -68, y: 124, dir: 0},
        {nome: "GreenEyes", vida: 80, tot_vida: 80, ataque: 2, x: -164, y: 124, dir: 0},
        {nome: "RedEyes", vida: 120, tot_vida: 120, ataque: 3, x: -356, y: 124, dir: 0},
        {nome: "RedEyes", vida: 120, tot_vida: 120, ataque: 3, x: -414, y: 124, dir: 0},
        {nome: "RedEyes", vida: 120, tot_vida: 120, ataque: 3, x: -472, y: 124, dir: 0},
        {nome: "RedEyes", vida: 120, tot_vida: 120, ataque: 3, x: -530, y: 124, dir: 0},
        {nome: "RedEyes", vida: 120, tot_vida: 120, ataque: 3, x: -588, y: 124, dir: 0},
        {nome: "RedEyes", vida: 120, tot_vida: 120, ataque: 3, x: -636, y: 124, dir: 0},
        {nome: "Phantom", vida: 160, tot_vida : 160, ataque: 4, x: -698, y: 124, dir: 0},
        {nome: "Phantom", vida: 160, tot_vida : 160, ataque: 4, x: -760, y: 124, dir: 0},
        {nome: "Phantom", vida: 160, tot_vida : 160, ataque: 4, x: -820, y: 124, dir: 0},
        {nome: "Phantom", vida: 160, tot_vida : 160, ataque: 4, x: -880, y: 124, dir: 0},
    ])

    // ini: inimigo que já está na tela
    const ini3 = horda3.slice(0, 1)
    // final: inimigos que ainda vão aparecer
    const final3 = horda3.slice(1, horda3.length)

    //resultado da primeira horda, que começou com 10 de vida
    const r_horda3 = await horda(ini3, r_horda2.vida, r_horda2.moedas, final3, escolha3.defensores)

    const escolha4 = await escolhaDefensores(r_horda3.moedas, escolha3.defensores, escolha3.posicoes, pers_disponiveis, r_horda3.vida)

    const horda4 = Object.freeze([
        {nome: "RedEyes", vida: 120, tot_vida: 120, ataque: 3, x: 28, y: 124, dir: 0},
        {nome: "RedEyes", vida: 120, tot_vida: 120, ataque: 3, x: -68, y: 124, dir: 0},
        {nome: "RedEyes", vida: 120, tot_vida: 120, ataque: 3, x: -164, y: 124, dir: 0},
        {nome: "RedEyes", vida: 120, tot_vida: 120, ataque: 3, x: -356, y: 124, dir: 0},
        {nome: "Phantom", vida: 160, tot_vida : 160, ataque: 4, x: -414, y: 124, dir: 0},
        {nome: "Phantom", vida: 160, tot_vida : 160, ataque: 4, x: -472, y: 124, dir: 0},
        {nome: "Phantom", vida: 160, tot_vida : 160, ataque: 4, x: -530, y: 124, dir: 0},
        {nome: "Phantom", vida: 160, tot_vida : 160, ataque: 4, x: -588, y: 124, dir: 0},
    ])

    // ini: inimigo que já está na tela
    const ini4 = horda4.slice(0, 1)
    // final: inimigos que ainda vão aparecer
    const final4 = horda4.slice(1, horda4.length)

    //resultado da primeira horda, que começou com 10 de vida
    const r_horda4 = await horda(ini4, r_horda3.vida, r_horda3.moedas, final4, escolha4.defensores)
}
document.getElementById('overlay').style.display = 'none'
iniciar ()
});
