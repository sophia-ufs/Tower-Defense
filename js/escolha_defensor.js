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
    console.log(x,y)
    console.log(aux)
    return aux
}
const capturaClique = async (lista_pos) => {
    return new Promise((resolve) => {
        canvas.addEventListener('click', function handleClick(event) {
            const mouseX = event.clientX - canvas.offsetLeft
            const mouseY = event.clientY - canvas.offsetTop
            const valida = posicao_valida(mouseX, mouseY, lista_pos)

            if(!valida){
                console.log("Não Válida")
                capturaClique(lista_pos)
            }else{
                // Retorna as coordenadas do clique
                resolve({ mouseX, mouseY })
            }
        })
    })
}
const escolhaDefensores = async (qtd_escolhas, coins) => {
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
    
        const n_coins = coins - 1
        // Continua a recursão para mais escolhas
        return await escolhaDefensores(qtd_escolhas - 1, n_coins);
    }
}