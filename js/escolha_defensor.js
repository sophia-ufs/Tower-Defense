// função para criar um novo defensor
const defensor = (nome, ataque, custo, x, y, alcance = 2) => {
    return {
        nome: nome,
        ataque: ataque,
        custo : custo,
        x : x,
        y : y,
        alcance : alcance
    }
}

// defensores disponíveis para se escolher
const pers_disponiveis = [
    defensor("Defensor 1", 1, 1, pos_pers1[0].x, pos_pers1[0].y, 200),
    defensor("Defensor 2", 2, 2, pos_pers1[3].x, pos_pers1[3].y, 150),
    defensor("Defensor 3", 5, 5, pos_pers1[6].x, pos_pers1[6].y, 100)
]

/* 
analisar se uma posição é válida
se param == -1 : estou analisando as posições onde se podem colocar defensores -> escolha da posição
se param >= 0 : representa quantas moedas o jogador tem, e analisa 
os personagens que ele consegue custear -> escolha do personagem

lpos representa a lista de posições em que se podem clicar no momento
*/
posicao_valida = (x, y, lpos, param = -1) => {
    const aux = achar({x:x, y:y} , lpos)
    if(aux.length == 0) return false // n achei uma posição válida
    else if(param >= 0 && aux[0].custo > param) return false // achei uma posição válida, mas n posso custear
    else return true
}

const draw_defensor = (defensores) => {
    defensores.forEach(def => {
        if(def.nome == "Defensor 1"){
            d.fillStyle = 'rgba(0, 0, 500, 0.5)' 
            d.fillRect(def.x, def.y, 48, 48);  
        }else if(def.nome == "Defensor 2"){
            d.fillStyle = 'rgba(255, 0, 0, 0.5)' 
            d.fillRect(def.x, def.y, 48, 48)
        }else{
            d.fillStyle = 'rgba(0, 300, 0, 0.5)' 
            d.fillRect(def.x, def.y, 48, 48)
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

// espera o clique em uma posição válida e retorna as coordenadas de onde esse clique aconteceu
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

/*
função que retorna ao final ols defenfores escolhidos, as moedas restantes e a situação
das posições em que se podem colocar personagens ( se estão ocupadas ou n)

qtd: quantas mudanças o jogador ainda pode fazer
ldef : lista de defensores
lpos : lista de posições onde se pode alocar defensores
lpers : lista de defensores que se pode escolher

 */
async function escolhaDefensores(qtd, moedas, ldef, lpos, lpers){
    //desenhas os defensores
    d.clearRect(0, 0, dcv.width, dcv.height)
    draw_defensor(ldef)

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

        if(pos.ocupado === false){
            console.log("Escolha o personagem", moedas)
            const coord_pers = await capturaClique(lpers, moedas)
            const pers = achar(coord_pers, lpers)[0]
            
            const n_defensor = defensor(pers.nome, pers.ataque, pers.custo, pos.x, pos.y, pers.alcance)
            const n_moedas = moedas - pers.custo
            const n_ldef = [...ldef, n_defensor]
            return await escolhaDefensores(qtd - 1, n_moedas, n_ldef, n_lpos, lpers);
        }else{
            const pers = achar(coord_pos, ldef)[0]
            const n_moedas = pers.custo*0.25 + moedas
            const n_ldef = remover(ldef, pers)
            return await escolhaDefensores(qtd - 1, n_moedas, n_ldef, n_lpos, lpers);
        }
    }
}