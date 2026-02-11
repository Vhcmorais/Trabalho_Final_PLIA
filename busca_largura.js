// Listagem 5.3 — Busca em Largura (JavaScript)

// ESTADO INICIAL E META
const estadoInicial = ["o", "o", "i", "*", "*"];
const estadoMeta    = ["*", "o", "i", "o", "*"];

// Função para comparar estados
function igual(a, b) {
  return a.toString() === b.toString();
}

// OPERAÇÕES POSSÍVEIS
function operacoes(estado) {
  const e = estado;
  const prox = [];

  // deslizar para o espaço vazio
  if (e[1] === "*") prox.push(["*", e[0], e[2], e[3], e[4]]);
  if (e[2] === "*") prox.push([e[0], "*", e[1], e[3], e[4]]);
  if (e[3] === "*") prox.push([e[0], e[1], "*", e[2], e[4]]);
  if (e[4] === "*") prox.push([e[0], e[1], e[2], "*", e[3]]);

  // saltar sobre uma ficha
  if (e[2] === "*") prox.push(["*", e[1], e[0], e[3], e[4]]);
  if (e[3] === "*") prox.push([e[0], "*", e[2], e[1], e[4]]);
  if (e[4] === "*") prox.push([e[0], e[1], "*", e[3], e[2]]);

  return prox;
}

// BUSCA EM LARGURA
function bfs() {
  // fila de caminhos
  const fila = [[estadoInicial]];

  while (fila.length > 0) {
    const caminho = fila.shift();
    const estadoAtual = caminho[0];

    // chegou à meta
    if (igual(estadoAtual, estadoMeta)) {
      return caminho;
    }

    // expandir
    for (const novoEstado of operacoes(estadoAtual)) {
      const jaVisitado = caminho.some(e => igual(e, novoEstado));
      if (!jaVisitado) {
        fila.push([novoEstado, ...caminho]);
      }
    }
  }

  return null;
}

// RESOLVER
const solucao = bfs();

// IMPRIMIR RESULTADO
if (solucao) {
  solucao.forEach(e => console.log(e));
}

/* Retorna: 

vit@NoteVitor:~/Documentos/Programs/PLIA_TRABALHO$ node busca_largura.js
[ '*', 'o', 'i', 'o', '*' ]
[ 'o', '*', 'i', 'o', '*' ]
[ 'o', 'o', 'i', '*', '*' ] */