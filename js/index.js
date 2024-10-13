const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
    
canvas.width = 1280
canvas.height = 768

c.fillStyle = 'bisque'
c.fillRect(0, 0, canvas.width, canvas.height)

const image = new Image()
image.onload = () => {
    c.drawImage(image, 0, 0, canvas.width, canvas.height)

    // visualizar posiçoes
    pos_defensor1.map( pos => {
        c.fillStyle = 'rgba(255, 255, 255, 0.05) '; 
        c.fillRect(pos.x, pos.y, 64, 64);  
    });
    createRectangles();
}
image.src = 'img/mapa01.png'

async function teste(){
    const k = await escolhaDefensores(5, 3, [], pos_defensor1) 
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