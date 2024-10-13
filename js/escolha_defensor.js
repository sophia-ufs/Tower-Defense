const defensor = (nome, ataque, x, y, custo) => {
    return {
        nome: nome,
        ataque: ataque,
        custo : custo,
        pos: {
            x : x,
            y : y,
        }
    }
}

posicao_valida = (x, y, lista_pos) => {
    const aux = lista_pos.some(pos => {
        return (
            x > pos.x && x < pos.x + 64 &&
            y > pos.y && y < pos.y + 64
        )
    })
    return aux
}

const draw_personagem = (coord, lista_pos) => {
    const aux = lista_pos.filter(pos => {
        return (
            coord.x > pos.x && coord.x < pos.x + 64 &&
            coord.y > pos.y && coord.y < pos.y + 64
        )
    })

    const pos = aux[0]
    c.fillStyle = 'black';
    c.fillRect(pos.x, pos.y, 64, 64) 
    
}
function capturaClique(lista_pos){
    return new Promise((resolve) => {
        canvas.addEventListener('click', function handleClick(event) {
            const x = event.clientX - canvas.offsetLeft
            const y = event.clientY - canvas.offsetTop
            const valida = posicao_valida(x, y, lista_pos)
            
            if(valida){
                resolve({ x, y })
                canvas.removeEventListener('click', handleClick)
            }else{
                console.log("Não Válida")
            }
        })
    })
}
async function escolhaDefensores(qtd_escolhas, coins){
    if(qtd_escolhas == 0){
        console.log("Acabou a qtd de escolhas")
        return []
    }else if ( coins == 0 ){
        console.log("Acabou o dinheiro")
        return []
    }else{
        console.log("Escolha a posição")
        const coordenadas_pos = await capturaClique(pos_defensor1);
        console.log(coordenadas_pos)
        
        draw_personagem(coordenadas_pos, pos_defensor1)
        const n_coins = coins - 1
        return await escolhaDefensores(qtd_escolhas - 1, n_coins);
    }
}