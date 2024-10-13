// canvas para o mapa -> fica fixo 
const canvas_m = document.getElementById('canvas_mapa')
const c = canvas_m.getContext('2d')

// canvas para os defensores e invasores -> fica sendo redesenhado
const dcv = document.getElementById('dcv');
const d = dcv.getContext('2d');
    
canvas_m.width = 960
canvas_m.height = 576

c.fillStyle = 'bisque'
c.fillRect(0, 0, canvas_m.width, canvas_m.height)

//função para visualizar as coisas provisoriamente
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
    //createRectangles();
}
image.src = 'img/mapa01.png'

// função de iniciar o jogo (uso do async por causa da dependência dos cliques do mouse)
async function iniciar(){

    //resultado da primeira escolha do jogador, com 5 mudanças possíveis e 6 moedas
    const escolha1 = await escolhaDefensores(5, 6, [], pos_defensor1, pers_disponiveis) 

    //inimigos da horda 1
    const horda1 = [
        {nome: "Invasor 1", vida: 10, ataque: 2, x: 28, y: 124, dir: 0},
        {nome: "Invasor 2", vida: 3, ataque: 3, x: -68, y: 124, dir: 0},
        {nome: "Invasor 2", vida: 3, ataque: 3, x: -164, y: 124, dir: 0},
        {nome: "Invasor 1", vida: 10, ataque: 2, x: -260, y: 124, dir: 0},
        {nome: "Invasor 3", vida: 20, ataque: 1, x: -356, y: 124, dir: 0},
    ]

    // ini: inimigo que já está na tela
    const ini = horda1.slice(0, 1)
    // final: inimigos que ainda vão aparecer
    const final = horda1.slice(1, horda1.length)

    //resultado da primeira horda, que começou com 10 de vida
    const r_horda1 = await horda(ini, 10, escolha1.moedas, final, escolha1.defensores)
    console.log("Vida : ", r_horda1.vida)
    console.log("Moedas : ", r_horda1.moedas)

}
iniciar()

//Função para criar retangulos (ainda nao funcional)
function createRectangles() {
    const numberOfRectangles = 5; // Defina quantos retângulos você deseja
    for (let i = 0; i < numberOfRectangles; i++) {
        createRectangle();
    }
}

function createRectangle() {
    const rectangle = document.createElement("div");
    rectangle.className = "retangulo"; // Classe CSS do retângulo
    rectangle.style.position = "absolute"; // Posição absoluta para que apareça sobre o canvas
    rectangle.style.top = "145px"; // Posição inicial vertical
    rectangle.style.left = "10px"; // Posição inicial horizontal
    rectangle.style.width = "110px"; // Largura do retângulo
    rectangle.style.height = "90px"; // Altura do retângulo
    rectangle.style.backgroundColor = "rgba(255, 0, 98)"; // Cor do retângulo
    document.body.appendChild(rectangle);

    moveRectangle(rectangle); // Move o retângulo
}

// Função para mover o retângulo (ainda não funcional)  
function moveRectangle(rectangle) {
    let position = 0; // Posição inicial
    const interval = setInterval(() => {
        if (position >= canvas_m.width) {
            clearInterval(interval); // Para o movimento ao alcançar o fim
            rectangle.remove(); // Remove o retângulo após o movimento
        } else {
            position += 2; // Ajuste a velocidade do movimento
            rectangle.style.left = position + "px"; // Move o retângulo
        }
    }, 30); // Ajuste o tempo para alterar a taxa de movimento
}