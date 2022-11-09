const axios = require('axios');
const https = require('https');

const clientId = process.env.GN_CLIENT_ID;
const clientSecret = process.env.GN_CLIENT_SECRET;
const gnCertificate = '-----BEGIN CERTIFICATE-----\n'.concat(process.env.GN_CERTIFICATE.replaceAll(' ', '\n')).concat('\n-----END CERTIFICATE-----');
const gnPrivateKey = '-----BEGIN PRIVATE KEY-----\n'.concat(process.env.GN_PRIVATE_KEY.replaceAll(' ', '\n')).concat('\n-----END PRIVATE KEY-----');
const gnUrl = process.env.GN_URL;

const httpsAgent = new https.Agent({
  cert: gnCertificate,
  key: gnPrivateKey,
});

const axiosInstance = axios.create({
  baseURL: gnUrl,
  httpsAgent
});

const authenticate = async () => {
  const data = {
    grant_type: "client_credentials"
  };

  const options = {
    auth: {
      username: clientId,
      password: clientSecret
    }
  }

  const request = await axiosInstance.post('/oauth/token', data, options);

  return request.data;
}

const gnRequest = async ({ method, url, data, options }) => {
  const authenticationData = await authenticate();

  options = {
    ...options,
    headers: {
      ...options?.headers,
      'Authorization': `${authenticationData.token_type} ${authenticationData.access_token}`
    }
  }

  try {
    const request = await axiosInstance.request({ method, url, data, ...options });

    return request.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = { gnRequest };