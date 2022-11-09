const { gnRequest } = require('../services/gn-requests.service');

const detailPixReceived = async ({ e2eId }) => {
  return gnRequest({ method: 'get', url: `/v2/pix/${e2eId}` });
}

module.exports = {
  detailPixReceived
}