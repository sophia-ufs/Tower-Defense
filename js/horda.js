// função para criar um novo invasor
const invasor = (nome, vida, tot_vida, ataque, x, y, dir) => {
    return {
        nome: nome,
        vida: vida,
        tot_vida : tot_vida,
        ataque : ataque,
        x : x,
        y : y,
        dir : dir,
    }
}

// cálculo do quadrado da distância entre dois elementos
const qdist = (x1, y1, x2, y2) => (x1-x2)**2 + (y1-y2)**2

// analisar retorna true se um defensor consegue atingir um invasor e false caso contrário
const alcança = (def, inv) => {

    //d -> quadrado da distancia entre o defensor e o invasor
    const d = qdist(def.x, def.y, inv.x, inv.y)

    //se d for menor ou igual ao quadrado do alcance do defensor, ent ele consegue atingir o invasor
    if(d <= def.alcance**2) return true
    else return false
}

/*
função que faz parte do reduce para contar as mortes
de invasores e converter em moedas para o jogador
o jogador recebe 50% do ataque de cada invasor morto da lista
*/
const mortes = (acc, inv) => {
    if(inv.vida <= 0) return acc + inv.ataque*0.5
    else return acc
}

/* função que faz parte do reduce para contar quantos
 invasores ultrapassaram o caminho sem serem mortos
 e converter em quanto de vida o jogador perdeu 
 y = 560 é o limite inferior do mapa */ 
const ultrapassou = (acc, inv) => {
    if(inv.y >= 560) return acc + inv.ataque
    else return acc
}

/* converte o valor que representa a direção do movimento de um invasor
 em quanto deve ser somado no x e no y da posição dele */
const conv_dir = (dir) => {
    if(dir == 0) return {x: 6, y: 0} // direita
    else if(dir == 1) return {x: -6, y: 0} //esquerda
    else if(dir == 2) return {x: 0, y: 6} // baixo
    else return {x: 0, y: -6} //cima
}

/* função para ver se o invasor esta sobre um ponto de referencia,
 se sim, a direção será mudada, se não permanece a msm */
const updtDir = (x, y, dir) => {
    const found = achar(coord(x,y), mapaUm)[0]
    if(indef(found)) return dir
    else return found.nd
}

/* função para atualizar as posições da lista inv dos invasores e
 retorna a lista de invasores com as posições atualizadas e o quanto
 de vida se perdeu com ultrapassagens de invasores */
const updtPos = (inv) => {
    // mov será a lista com as posições atualizadas
    const mov = inv.map((curr) => {
        const n_dir = updtDir(curr.x, curr.y, curr.dir)
        const change = conv_dir(n_dir)
        return invasor(curr.nome, curr.vida, curr.tot_vida, curr.ataque, 
                       curr.x + change.x, curr.y + change.y, n_dir)
    })

    // perda será o valor de vida perdido com quem ultrapassou 
    const perda = mov.reduce(ultrapassou, 0)

    // inv_tela é a lista com apenas os invasores que ainda estão no mapa
    const inv_tela = mov.filter((inv) => inv.y < 560)

    return {inv : inv_tela, perda : perda }
}

/*função recursiva que retorna os invasores com suas vidas atualizadas após o 
ataque dos defensores e quanto de moedas se ganhou com essa onda de ataques */

const ataque_defensores = ([def, ...resto], inv_curr, ganho = 0) => {
    if (indef(def)) return {inv : inv_curr, ganho : ganho} // caso base : já analise todos os defensores
    else{

        // para def ( o defensor atual ) atualizo a vida de todos que ele alcança
        const upd_vida = inv_curr.map(inv => {
            if(alcança(def, inv)){
                return invasor(inv.nome, inv.vida - def.ataque, inv.tot_vida, inv.ataque, inv.x, inv.y, inv.dir)
            }else return inv
        })

        const n_ganho = ganho + upd_vida.reduce(mortes, 0)
        const inv_vivos = upd_vida.filter((inv) => inv.vida > 0)
        return ataque_defensores(resto, inv_vivos, n_ganho)
    }
}

// desenhar os invasores na tela
const draw_invasor = (invasores) => {
    d.clearRect(0, 0, dcv.width, dcv.height); // Limpa o canvas primeiro

    invasores.forEach(inv => {
        if (inv.nome == "Invasor 1") {
            d.fillStyle = 'green';
        } else if (inv.nome == "Invasor 2") {
            d.fillStyle = 'blue';
        }else{
            d.fillStyle = 'red';
        }
        d.fillRect(inv.x, inv.y, 48, 48);

        d.fillStyle = 'white';
        d.font = '12x Arial Black';
        d.textAlign = 'center';
        d.textBaseline = 'middle';
        d.fillText(inv.vida, inv.x + 24, inv.y + 24);
    
        draw_healthBar(inv);
    })

}

// Função para desenhar a barra de vida acima do invasor
const draw_healthBar = (inv) => {
    const maxWidth = 48; //Largura máxima da barrinha de vida
    const maxLife = inv.tot_vida // Vida máxima
    const healthPercentage = inv.vida / maxLife; // Percentual de vida 

    // Definindo cor: verde > amarelo > vermelho
    const color = healthPercentage > 0.5 ? 'green' :
                  healthPercentage > 0.25 ? 'yellow' : 'red';

    // Desenha a barra de vida acima do invasor
    d.fillStyle = color;
    d.fillRect(inv.x, inv.y - 12, maxWidth * healthPercentage, 8); // Tamanhos de largura e comprimento da barra de vida acima do invasor
};

// Função para desenhar a vida do jogador na tela
const drawVida = (vida) => {
    d.clearRect(800, 0, 160, 40); // Limpa a área onde a vida será desenhada (ajuste a posição se necessário)
    
    // Desenha o texto da vida do jogador
    d.fillStyle = 'black';
    d.font = '20px Arial';
    d.textAlign = 'right';
    d.textBaseline = 'top';
    d.fillText('Vida: ' + vida, 810, 10); // Posição x = 810, y = 10 (ajuste conforme necessário)
};

// Função de atraso para dar tempo de renderização entre os ciclos
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// função recursiva que retornará as vidas e as moedas após uma horda
const horda = async (inv_curr, vida, moedas, inv_fora, def) => {

    // Desenho os invasores e os defensores
    draw_invasor(inv_curr)
    draw_defensor(def)
    drawVida(vida)

    // Adiciona um pequeno atraso para dar tempo para os inimigos aparecerem
    await delay(100); // Meio segundo de pausa entre os movimentos

    if (inv_curr.length == 0 || vida <= 0) { // Caso base: Sem invasores ou jogador perdeu todas as vidas
        return {vida: vida, moedas: moedas};
    } else {
        // Primeiro os defensores atacam os invasores
        const atq = ataque_defensores(def, inv_curr);
        const n_moedas = moedas + atq.ganho;

        // Depois os invasores se movimentam
        const mov = updtPos(atq.inv); // Movimento de quem já estava no mapa
        const mov2 = updtPos(inv_fora); // Movimento de quem ainda não estava no mapa

        // Novos são os inimigos que acabaram de aparecer no mapa
        const novos = mov2.inv.filter((curr) => curr.x >= 0);

        // n_fora representará a nova lista de quem ainda não apareceu no mapa
        const n_fora = mov2.inv.filter((curr) => curr.x < 0);

        // n_inv representa a nova lista de quem está no mapa
        const n_inv = [...mov.inv, ...novos];
        const n_vida = vida - mov.perda;

        // Chama a próxima iteração da horda após o movimento e ataque
        return await horda(n_inv, n_vida, n_moedas, n_fora, def);
    }
}
