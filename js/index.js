const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
    
canvas.width = 1280*3/4
canvas.height = 768*3/4

c.fillStyle = 'bisque'
c.fillRect(0, 0, canvas.width, canvas.height)

// funções genéricas
const remover = ( lista, elemento ) => {
    return lista.filter((x) => x != elemento )
}
const adicionar = ( lista, elemento ) => {
    return [...lista, elemento]
}
const editar = ( lista, elemento, n_elemento) => {
    const aux = remover(lista, elemento)
    return adicionar(aux, n_elemento)
}
const achar = (coord, lista_pos) => {
    return lista_pos.filter(pos => {
        return (
            coord.x > pos.x && coord.x < pos.x + 48 &&
            coord.y > pos.y && coord.y < pos.y + 48
        )
    })
}

const image = new Image()
image.onload = () => {
    c.drawImage(image, 0, 0, canvas.width, canvas.height)

    // visualizar posiçoes
    pos_defensor1.map( pos => {
        c.fillStyle = 'rgba(255, 255, 255, 0.05) '; 
        c.fillRect(pos.x, pos.y, 48, 48);  
    });
    //createRectangles();
}
image.src = 'img/mapa01.png'

async function teste(){
    const k = await escolhaDefensores(5, 3, [], pos_defensor1, pers_disponiveis) 
    console.log(k)
}
teste()

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
        if (position >= canvas.width) {
            clearInterval(interval); // Para o movimento ao alcançar o fim
            rectangle.remove(); // Remove o retângulo após o movimento
        } else {
            position += 2; // Ajuste a velocidade do movimento
            rectangle.style.left = position + "px"; // Move o retângulo
        }
    }, 30); // Ajuste o tempo para alterar a taxa de movimento
}