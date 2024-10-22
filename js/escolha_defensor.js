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
    defensor("Defensor 1", 1, 1, 821, 56, 150),
    defensor("Defensor 2", 5, 5, 821, 140, 100),
    defensor("Defensor 3", 10, 10, 821, 220, 80)
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

const draw_defensor = (defensores, ind = 0) => {
    const spriteDefensor1 = new Image()
    spriteDefensor1.src = 'img/defensor1.png'
    const spriteDefensor2 = new Image()
    spriteDefensor2.src = 'img/defensor2t.png'
    const spriteDefensor3 = new Image()
    spriteDefensor3.src = 'img/defensor3.png'
    
    defensores.forEach(def => {
        d.beginPath()
        d.arc(def.x + 24, def.y + 24, def.alcance, 0, 2 * Math.PI) // `def.alcance` deve ser definido para cada defensor
        d.fillStyle = 'rgba(255, 255, 255, 0.1)' // Círculo de alcance com transparência
        d.fill() // Preenche o círculo

        if(def.nome == "Defensor 1"){ 
            draw_frame(def, ind%8, spriteDefensor1, 8, 128)
        }else if(def.nome == "Defensor 2"){
            draw_frame(def, ind%4, spriteDefensor2, 4, 118)
        }else{
            draw_frame(def, ind%8, spriteDefensor3, 8, 128)
        }
    })
}

const draw_botao_horda = () => {
    d.fillStyle = 'rgb(34,139,34)' 
    d.fillRect(865, 500, 48, 48)

    d.strokeStyle = 'black'
    d.lineWidth = 2 
    d.strokeRect(865, 500, 48, 48)

    d.fillStyle = 'black'
    d.font = '13px cursive' 
    d.textAlign = 'center' 
    d.textBaseline = 'middle' 
    d.fillText("Iniciar", 865 + 24, 500 + 20) 
    d.fillText("Horda", 865 + 24, 500 + 35) 
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
const escolhaDefensores = async (moedas, ldef, lpos, lpers, vida, ind = false) => {
    d.clearRect(0, 0, dcv.width, dcv.height)  
    
    draw_botao_horda()
    draw_defensor(ldef) 
    drawVida_Moeda(vida, moedas)

    if(ind == true){ // caso base 
        return{
            moedas: moedas,
            defensores : ldef,
            posicoes : lpos
        }
    }else{
        exibirComando(t, "Escolha a Posição", 520, 70)
        const coord_pos = await capturaClique(lpos) // coordenadas do clique
        const pos = achar(coord_pos, lpos)[0]
        if(pos.x == 865 && pos.y == 500){
            return escolhaDefensores(moedas, ldef, lpos, lpers, vida, true)
        }else{
            // edição da situação da posição, se ocupada == true, troco para ocupada == false e vice-versa
            const inv_pos = {x:pos.x, y:pos.y, ocupado:!pos.ocupado} 
            const n_lpos = editar(lpos, pos, inv_pos) // lista de posiçõea atualizada

            // se a posição n estava ocupada, ent tenho que escolher o personagem para ocupá-la
            if(pos.ocupado == false){
                exibirComando(t, "Escolha o Personagem", 10, 20)
                const coord_pers = await capturaClique(lpers, moedas) // coordenadas do clique
                // pers representa o personagem do quadrado em que a coord_pos está inclusa
                const pers = achar(coord_pers, lpers)[0]
                
                const n_def = defensor(pers.nome, pers.ataque, pers.custo, pos.x, pos.y, pers.alcance) // defensor que vai ser adicionado
                const n_moedas = moedas - pers.custo
                const n_ldef = adicionar(ldef, n_def)

                return await escolhaDefensores(n_moedas, n_ldef, n_lpos, lpers, vida, false);
            }else{ // se a pos esta ocupada, vou tirar o personagem alocado nela
                const pers = achar(coord_pos, ldef)[0] // acho quem é esse personagem
                const n_moedas = pers.custo*0.25 + moedas // 25% de cashback do custo do personagem
                const n_ldef = remover(ldef, pers) // removo da lista de defensores
                return await escolhaDefensores(n_moedas, n_ldef, n_lpos, lpers, vida, false)
            }
        }
    }
}