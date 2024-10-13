const canvas_m = document.getElementById('canvas_mapa')
const c = canvas_m.getContext('2d')

const dcv = document.getElementById('dcv');
const d = dcv.getContext('2d');
    
canvas_m.width = 1280*3/4
canvas_m.height = 768*3/4

c.fillStyle = 'bisque'
c.fillRect(0, 0, canvas_m.width, canvas_m.height)

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

const visu_temp = () => {
    // visualizar posiçoes
    pos_defensor1.map( pos => {
        c.fillStyle = 'rgba(255, 255, 255, 0.05) ' 
        c.fillRect(pos.x, pos.y, 48, 48);  
    });


    //visualizar personagens 
    pers_disponiveis.map( pos => {

        if(pos.nome == "Defensor 1"){
            c.fillStyle = 'rgba(0, 0, 500, 0.5)' 
            c.fillRect(pos.x, pos.y, 48, 48);  
        }else{
            c.fillStyle = 'rgba(255, 0, 0, 0.5)' 
            c.fillRect(pos.x, pos.y, 48, 48)
        }

        c.strokeStyle = 'black' // Cor da borda
        c.lineWidth = 2 // Espessura da borda
        c.strokeRect(pos.x, pos.y, 48, 48)

        // Adiciona o texto no centro do retângulo
        c.fillStyle = 'black' // Cor do texto
        c.font = '9px Arial' // Estilo e tamanho da fonte
        c.textAlign = 'center' // Alinhamento do texto
        c.textBaseline = 'middle' // Alinhamento vertical
        c.fillText(pos.nome, pos.x + 24, pos.y + 24) 
    })
}

function desenhar_mapa(){
    const image = new Image()
    image.onload = () => {
        c.drawImage(image, 0, 0, canvas_m.width, canvas_m.height)
        visu_temp()
        //createRectangles();
    }
    image.src = 'img/mapa01.png'
}

desenhar_mapa()
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
        if (position >= canvas_m.width) {
            clearInterval(interval); // Para o movimento ao alcançar o fim
            rectangle.remove(); // Remove o retângulo após o movimento
        } else {
            position += 2; // Ajuste a velocidade do movimento
            rectangle.style.left = position + "px"; // Move o retângulo
        }
    }, 30); // Ajuste o tempo para alterar a taxa de movimento
}