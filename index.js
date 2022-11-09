const { createPixCob } = require('./use-cases/create-pix-cob');
const { listPixCob } = require('./use-cases/list-pix-cob');
const { listPixReceived } = require('./use-cases/list-pix-received');
const { detailPixCob } = require('./use-cases/detail-pix-cob');
const { detailPixReceived } = require('./use-cases/detail-pix-received');

exports.handler = async (event) => {
  // return {
  //   statusCode: 200
  // };

  const { resource, path, body, queryStringParameters, httpMethod } = event;

  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
      }
    };
  }

  let responseData;

  try {
    switch (resource) {
      case '/pix/cob':
        responseData = await createPixCob({ body: JSON.parse(body) });
        break;
      case '/pix/list/{proxy+}':
        const proxy = path.split('/')[3];

        switch (proxy) {
          case 'cob':
            responseData = await listPixCob({ query: queryStringParameters });
            break;

          case 'received':
            responseData = await listPixReceived({ query: queryStringParameters });
            break;
        }
        break;
      case '/pix/cob/{txId+}':
        const txId = path.split('/')[3];

        responseData = await detailPixCob({ txId });
        break;
      case '/pix/received/{e2eId+}':
        const e2eId = path.split('/')[3];

        responseData = await detailPixReceived({ e2eId });
        break;
    }

    return {
      statusCode: 200,
      body: JSON.stringify(responseData),
      headers: {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
      }
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 400,
      body: JSON.stringify(err),
      headers: {
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
      }
    };
  }
};
