const NORTE = "norte";
const SUL = "sul";

// Estado inicial e final
const estadoInicial = [NORTE, NORTE, NORTE, NORTE];
const estadoFinal   = [SUL, SUL, SUL, SUL];

// Função para inverter margem
function oposto(lado) {
  return lado === NORTE ? SUL : NORTE;
}

// Verifica se um estado é inválido
function invalido([f, l, c, r]) {
  // Lobo com cabra sem o fazendeiro
  if (l === c && f !== l) return true;

  // Cabra com repolho sem o fazendeiro
  if (c === r && f !== c) return true;

  return false;
}

// Gera todos os movimentos possíveis
function movimentos(estado) {
  const [f, l, c, r] = estado;
  const prox = [];

  // Fazendeiro sozinho
  prox.push([oposto(f), l, c, r]);

  // Com lobo
  if (f === l)
    prox.push([oposto(f), oposto(l), c, r]);

  // Com cabra
  if (f === c)
    prox.push([oposto(f), l, oposto(c), r]);

  // Com repolho
  if (f === r)
    prox.push([oposto(f), l, c, oposto(r)]);

  return prox.filter(e => !invalido(e));
}

// Busca em profundidade
function dfs(estado, caminho, visitados) {
  if (estado.toString() === estadoFinal.toString()) {
    return caminho;
  }

  for (const prox of movimentos(estado)) {
    const key = prox.toString();
    if (!visitados.has(key)) {
      visitados.add(key);
      const res = dfs(prox, [...caminho, prox], visitados);
      if (res) return res;
    }
  }
  return null;
}

// Resolver
function resolver() {
  const visitados = new Set();
  visitados.add(estadoInicial.toString());

  const caminho = dfs(estadoInicial, [estadoInicial], visitados);

  caminho.forEach(e => console.log(e));
}

// Executar
resolver();

/* Retorna: 

vit@NoteVitor:~/Documentos/Programs/PLIA_TRABALHO$ node fazendeiro.js
[ 'norte', 'norte', 'norte', 'norte' ]
[ 'sul', 'norte', 'sul', 'norte' ]
[ 'norte', 'norte', 'sul', 'norte' ]
[ 'sul', 'sul', 'sul', 'norte' ]
[ 'norte', 'sul', 'norte', 'norte' ]
[ 'sul', 'sul', 'norte', 'sul' ]
[ 'norte', 'sul', 'norte', 'sul' ]
[ 'sul', 'sul', 'sul', 'sul' ] */
