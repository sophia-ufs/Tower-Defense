// funções genéricas
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

// achar se a coordenada intercepta uma das posições em lista_pos, e retornar a posição interceptada
const achar = (coord, lista_pos) => {
    return lista_pos.filter(pos => {
        return (
            coord.x >= pos.x && coord.x <= pos.x + 48 &&
            coord.y >= pos.y && coord.y <= pos.y + 48
        )
    })
}
const indef = x => typeof x == 'undefined'