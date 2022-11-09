const { gnRequest } = require('../services/gn-requests.service');

const listPixReceived = async ({ query }) => {
  const options = {
    params: {
      inicio: query.inicio,
      fim: query.fim
    }
  }

  return gnRequest({ method: 'get', url: '/v2/pix', options });
}

module.exports = {
  listPixReceived
}