const { gnRequest } = require('../services/gn-requests.service');

const detailPixCob = async ({ txId }) => {
  const cob = await gnRequest({ method: 'get', url: `/v2/cob/${txId}` });
  const qrCode = await gnRequest({ method: 'get', url: `/v2/loc/${cob.loc.id}/qrcode` });

  return {
    cob, qrCode
  }
}

module.exports = {
  detailPixCob
}