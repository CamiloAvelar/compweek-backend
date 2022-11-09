const { gnRequest } = require('../services/gn-requests.service');

const listPixCob = async ({ query }) => {
  const options = {
    params: {
      inicio: query.inicio,
      fim: query.fim
    }
  }

  return gnRequest({ method: 'get', url: '/v2/cob', options });
}

module.exports = {
  listPixCob
}