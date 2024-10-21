// função para criar um novo defensor
const defensor = (nome, ataque, custo, x, y, alcance) => {
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
    defensor("Defensor 1", 1, 1, pos_pers1[4].x, pos_pers1[4].y, 150),
    defensor("Defensor 2", 2, 2, pos_pers1[10].x, pos_pers1[10].y, 100),
    defensor("Defensor 3", 3, 3, pos_pers1[16].x, pos_pers1[16].y, 75)
]

/* 
analisar se uma posição clicada é válida
se param == -1 : 
    momento da escolha da posição do defensor
    retorna true se (x,y) esta dentro de algm dos quadrados válidos
se param >= 0 : 
    momento da escolha do personagem 
    param vai representar a qtd de dinheiro que o jogador tem
    retorna true se a posição representar o lugar onde estão os personagens e se o jogador tem 
    dinheiro suficiente para aquele personagem

lpos representa a lista de posições válidas para aquele momento 
*/
const posicao_valida = (x, y, lpos, param = -1) => {
    const found = achar(coord(x,y) , lpos)[0] // found : resultado da procura por (x,y) em lpos
    if(indef(found)) return false // (x,y) n esta na lista de pos válidas
    else if(param >= 0 && found.custo > param) return false // achei (x, y), mas o jogador n tem dinheiro suficiente 
    else return true
}

const draw_defensor = (defensores) => {
    defensores.forEach(def => {

        d.beginPath();
        d.arc(def.x + 24, def.y + 24, def.alcance, 0, 2 * Math.PI); // `def.alcance` deve ser definido para cada defensor
        d.fillStyle = 'rgba(255, 255, 255, 0.1)'; // Círculo de alcance com transparência
        d.fill(); // Preenche o círculo
        d.strokeStyle = 'rgba(0, 0, 0, 0.2)'; // Cor da borda do círculo de alcance
        d.stroke(); // Desenha a borda do círculo

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
        d.fillStyle = 'black'; 
        d.font = '9px Arial'; 
        d.textAlign = 'center'; // Alinhamento horizontal
        d.textBaseline = 'middle'; // Alinhamento vertical
        d.fillText(def.nome, def.x + 24, def.y + 24); 
    })
}

// espera o clique em uma posição válida e retorna as coordenadas de onde esse clique aconteceu
const capturaClique = (lpos, param = -1) => {
    return new Promise((resolve) => {
        dcv.addEventListener('click', function handleClick(event) {
            const x = event.clientX - dcv.offsetLeft
            const y = event.clientY - dcv.offsetTop
            const valida = posicao_valida(x, y, lpos, param)
            
            if(valida){
                resolve({ x, y })
                dcv.removeEventListener('click', handleClick)
                // se o clique foi válido, retorna as coordenadas a para de esperar um clique
            }else{
                console.log("Não Válida")
                // qnd o clique n for válido, continua esperando um novo clique
            }
        })
    })
}

/*
função que retorna os defenfores escolhidos, as moedas restantes e a situação 
das posições em que se podem colocar personagens ( se estão ocupadas ou n) atualizada

qtd: quantos personagens podem ser adicionados
ldef : lista de defensores escolhidos até ent
lpos : lista de posições onde se pode alocar defensores
lpers : lista de defensores que se pode escolher
*/
const escolhaDefensores = async (qtd, moedas, ldef, lpos, lpers) => {
    d.clearRect(0, 0, dcv.width, dcv.height) // limpa o canvas 
    draw_defensor(ldef) // desenha os defensores

    if(qtd == 0){ // caso base 
        console.log("Acabou a qtd de escolhas")
        return{
            moedas: moedas,
            defensores : ldef,
            posicoes : lpos
        }
    }else if ( moedas < 1 ){ // caso base
        // considerando que o defensor mais barato custa 1
        console.log("Dinheiro insuficiente")
        return{
            moedas: moedas,
            defensores : ldef,
            posicoes : lpos
        }
    }else{
        console.log("Escolha a posição")
        const coord_pos = await capturaClique(lpos) // coordenadas do clique
        // pos representa o quadrado em que a coord_pos está inclusa
        const pos = achar(coord_pos, lpos)[0]

        // edição da situação da posição, se ocupada == true, troco para ocupada == false e vice-versa
        const inv_pos = {x:pos.x, y:pos.y, ocupado:!pos.ocupado} 
        const n_lpos = editar(lpos, pos, inv_pos) // lista de posiçõea atualizada

        // se a posição n estava ocupada, ent tenho que escolher o personagem para ocupá-la
        if(pos.ocupado == false){
            console.log("Escolha o personagem", moedas)
            const coord_pers = await capturaClique(lpers, moedas) // coordenadas do clique
            // pers representa o personagem do quadrado em que a coord_pos está inclusa
            const pers = achar(coord_pers, lpers)[0]
            
            const n_def = defensor(pers.nome, pers.ataque, pers.custo, pos.x, pos.y, pers.alcance) // defensor que vai ser adicionado
            const n_moedas = moedas - pers.custo
            const n_ldef = adicionar(ldef, n_def)

            return await escolhaDefensores(qtd - 1, n_moedas, n_ldef, n_lpos, lpers);
        }else{ // se a pos esta ocupada, vou tirar o personagem alocado nela
            const pers = achar(coord_pos, ldef)[0] // acho quem é esse personagem
            const n_moedas = pers.custo*0.25 + moedas // 25% de cashback do custo do personagem
            const n_ldef = remover(ldef, pers) // removo da lista de defensores
            return await escolhaDefensores(qtd, n_moedas, n_ldef, n_lpos, lpers)
        }
    }
}