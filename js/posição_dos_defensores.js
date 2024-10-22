
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
const pos_defensor1 = [...achar_posiçoes_d(dados_locais_mapa1, 24), coord(865, 500)]

//pontos de mudança de direção
const mapaUm = [
  {x:170,y:124,nd: 2}, 
  {x:170,y:360,nd:0}, 
  {x:600,y:360,nd:2}, 
  {x:600,y:560,nd:2}
]