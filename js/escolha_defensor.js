const defensor = (nome, ataque, custo, x, y) => {
    return {
        nome: nome,
        ataque: ataque,
        custo : custo,
        x : x,
        y : y,
    }
}

const pers_disponiveis = [
    defensor('Defensor 1', 1, 1, pos_pers1[0].x, pos_pers1[0].y),
    defensor('Defensor 2', 2, 2, pos_pers1[3].x, pos_pers1[3].y)
]

posicao_valida = (x, y, lpos, param = -1) => {
    const aux = lpos.filter(pos => {
        return (
            x > pos.x && x < pos.x + 48 &&
            y > pos.y && y < pos.y + 48
        )
    })
    if(aux.length == 0) return false
    else if(param >= 0 && aux[0].custo > param) return false
    else return true
}

const draw_personagem = (defensores) => {

    d.clearRect(0, 0, canvas_m.width, canvas_m.height)

    defensores.forEach(def => {
        if(def.nome == "Defensor 1"){
            d.fillStyle = 'rgba(0, 0, 500, 0.5)'; 
            d.fillRect(def.x, def.y, 48, 48);  
        }else{
            d.fillStyle = 'rgba(255, 0, 0, 0.5)'; 
            d.fillRect(def.x, def.y, 48, 48);
        }
    
        d.strokeStyle = 'black'; // Cor da borda
        d.lineWidth = 2; // Espessura da borda
        d.strokeRect(def.x, def.y, 48, 48);
    
        // Adiciona o texto no centro do retângulo
        d.fillStyle = 'black'; // Cor do texto
        d.font = '9px Arial'; // Estilo e tamanho da fonte
        d.textAlign = 'center'; // Alinhamento do texto
        d.textBaseline = 'middle'; // Alinhamento vertical
        d.fillText(def.nome, def.x + 24, def.y + 24); 
    })
}

function capturaClique(lpos, param = -1){
    return new Promise((resolve) => {
        dcv.addEventListener('click', function handleClick(event) {
            const x = event.clientX - dcv.offsetLeft
            const y = event.clientY - dcv.offsetTop
            const valida = posicao_valida(x, y, lpos, param)
            
            if(valida){
                resolve({ x, y })
                dcv.removeEventListener('click', handleClick)
            }else{
                console.log("Não Válida")
            }
        })
    })
}
async function escolhaDefensores(qtd, moedas, ldef, lpos, lpers){

    draw_personagem(ldef)
    if(qtd == 0){
        console.log("Acabou a qtd de escolhas")
        return{
            moedas: moedas,
            defensores : ldef,
            posicoes : lpos
        }
    }else if ( moedas < 1 ){
        console.log("Acabou o dinheiro")
        return{
            moedas: moedas,
            defensores : ldef,
            posicoes : lpos
        }
    }else{

        console.log("Escolha a posição")
        const coord_pos = await capturaClique(lpos)
        const pos = achar(coord_pos, lpos)[0]

        const inv_pos = {x:pos.x, y:pos.y, ocupado:!pos.ocupado}
        const n_lpos = editar(lpos, pos, inv_pos)
        
        console.log(pos)

        if(pos.ocupado === false){
            console.log("Escolha o personagem", moedas)
            const coord_pers = await capturaClique(lpers, moedas)
            const pers = achar(coord_pers, lpers)[0]
            
            const n_defensor = defensor(pers.nome, pers.ataque, pers.custo, pos.x, pos.y)
            const n_moedas = moedas - pers.custo
            const n_ldef = [...ldef, n_defensor]
            return await escolhaDefensores(qtd - 1, n_moedas, n_ldef, n_lpos, lpers);
        }else{
            console.log("op 2")
            const pers = achar(coord_pos, ldef)[0]
            const n_moedas = pers.custo*0.25 + moedas
            const n_ldef = remover(ldef, pers)
            return await escolhaDefensores(qtd - 1, n_moedas, n_ldef, n_lpos, lpers);
        }
    }
}