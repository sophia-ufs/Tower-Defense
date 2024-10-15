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

/*
lista_pos representara quadrados de lado 48 
achar retorna o "quadrado" de lista_pos em que coord esta inclusa
*/
const achar = (coord, lista_pos) => {
    return lista_pos.filter(pos => {
        return (
            coord.x >= pos.x && coord.x <= pos.x + 48 &&
            coord.y >= pos.y && coord.y <= pos.y + 48
        )
    })
}

// retorna true se x tem valor indefinido
const indef = x => typeof x == 'undefined'

// conversão das coordenadas para um registro
const coord = (x, y) => ({x:x, y:y})