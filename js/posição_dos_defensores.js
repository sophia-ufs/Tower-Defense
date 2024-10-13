
const dados_locais_mapa1 = [ 
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 24, 0, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 24, 0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0,
  0, 0, 24, 0, 0, 24, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
] 

const dados_pers_mapa1 = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 3, 1, 1, 1, 4329, 4329, 4329,
  468, 1, 0, 1, 0, 1, 1, 1, 19, 1, 1, 7, 1, 1, 1, 1, 5, 4329, 4329, 4329,
  66, 66, 66, 66, 67, 1, 1, 1, 17, 5, 1, 1, 1, 1, 2, 20, 2, 4329, 4329, 4329,
  82, 82, 82, 74, 75, 0, 3, 1, 1, 1, 1, 2, 12, 2, 15, 24, 1, 4329, 4329, 4329,
  1, 1, 1, 165, 166, 1, 1, 424, 1, 3, 2, 31, 1, 1, 1, 1, 1, 4329, 4329, 4329,
  1, 1, 12, 34, 34, 1, 2, 440, 2, 1, 1, 1, 1, 1, 1, 26, 19, 4329, 4329, 4329,
  1, 0, 1, 34, 42, 55, 1, 456, 632, 0, 1, 1, 0, 3, 1, 1, 1, 4329, 4329, 4329,
  3, 1, 1, 49, 50, 41, 50, 62, 66, 66, 66, 66, 66, 67, 0, 0, 0, 4329, 4329, 4329,
  1, 1, 1, 58, 34, 34, 34, 392, 82, 82, 82, 82, 74, 75, 0, 0, 0, 4329, 4329, 4329,
  1, 1, 1, 19, 1, 1, 1, 408, 1, 1, 1, 26, 73, 75, 1, 1, 0, 4329, 4329, 4329,
  12, 1, 0, 1, 12, 0, 1, 1, 1, 1, 19, 1, 165, 166, 1, 7, 0, 4329, 4329, 4329,
  1, 1, 1, 1, 14, 1, 1, 1, 1, 1, 1, 1, 181, 182, 1, 1, 0, 4329, 4329, 4329
]

const nova_pos_defesa = (x, y, ocupado) => {
  return {
      x : x*48,
      y : y*48,
      ocupado : ocupado
  }
}

// converter uma lista 1D em coordenadas 2D de um mapa (20 x 12)
const achar_coordenadas = (num) => {
  const y = Math.floor(num/20)
  const x = num%20
  return nova_pos_defesa(x, y, false)
}


// função recursiva para achar os locais de defensores baseados nos dados do mapa
const achar_posiçoes_d = ([x, ...xs], param, pos = 0) => { 
  if(pos == 240) return []
  else if(x == param) return [achar_coordenadas(pos), ...achar_posiçoes_d(xs, param, pos+1)] 
  else return achar_posiçoes_d(xs, param, pos+1)
}
// posições onde se pode alocar defensores no mapa 1
const pos_defensor1 = achar_posiçoes_d(dados_locais_mapa1, 24)
// posições onde estão as escolhas de personagens
const pos_pers1 = achar_posiçoes_d(dados_pers_mapa1, 4329)

//pontos de mudança de direção
const mapaUm = [
  //{x: -40, y: 124, nd: 0},
  {x:170,y:124,nd: 2}, 
  {x:170,y:360,nd:0}, 
  {x:600,y:360,nd:2}, 
  {x:600,y:560,nd:2}
]