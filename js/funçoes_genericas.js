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

/*
lista_pos representara quadrados de lado 48 
achar retorna o "quadrado" de lista_pos em que coord esta inclusa
*/
const achar = (coord, lista_pos) => {
    return lista_pos.filter(pos => {
        return (
            coord.x >= pos.x && coord.x <= pos.x + 48 &&
            coord.y >= pos.y && coord.y <= pos.y + 48
        )
    })
}

// retorna true se x tem valor indefinido
const indef = x => typeof x == 'undefined'

// conversão das coordenadas para um registro
const coord = (x, y) => ({x:x, y:y})

const drawVida_Moeda = (vida, moeda) => {
    d.clearRect(820, 410, 160, 40)
    d.clearRect(820, 430, 160, 40) 
    // Desenha o texto da vida do jogador
    d.fillStyle = 'black';
    d.font = '20px Arial';
    d.textAlign = 'center';
    d.textBaseline = 'top';
    d.fillText('Vida: ' + vida, 887, 410) // Posição x = 810, y = 10 (ajuste conforme necessário)
    d.fillText('Moedas: ' + moeda, 887, 430)
}

const draw_frame = (pers, frame, sprite, qtd, sz) => {
    const largura = sprite.width/qtd 
    const altura = sprite.height
    const sx = frame * largura
    const sy = 0; 
    d.drawImage(sprite, sx, sy, largura, altura, pers.x + (48-sz)/2, pers.y + (48-sz)/2, sz, sz);
}

const exibirComando = (ctx, txt, x, y) => {
    ctx.clearRect(0, 0, tcanvas.width, tcanvas.height)
    ctx.fillStyle = 'black'; // Cor do texto
    ctx.font = '20px Arial'; // Estilo da fonte
    ctx.fillText(txt, x, y); // Desenha o texto no canvas
}