const { gnRequest } = require('../services/gn-requests.service');

const createPixCob = async ({ body }) => {
  const keys = await gnRequest({ method: 'get', url: '/v2/gn/evp' });
  let key;

  if (Array.isArray(keys.chaves) && keys.chaves.length > 0) {
    key = keys.chaves[0];
  } else {
    const createKey = await gnRequest({ method: 'post', url: '/v2/gn/evp' });
    key = createKey.chave;
  }

  const data = {
    calendario: {
      expiracao: 3600
    },
    devedor: {
      cpf: body.cpf,
      nome: body.nome
    },
    valor: {
      original: String(body.valor)
    },
    chave: key,
    solicitacaoPagador: body.solicitacaoPagador
  }

  return gnRequest({ method: 'post', url: '/v2/cob', data });
}

module.exports = {
  createPixCob
}