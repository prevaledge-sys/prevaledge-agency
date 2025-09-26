const { getDb } = require('./utils/mongodb.cjs');

exports.handler = async (event, context) => {
  const allowedOrigins = ['https://prevaledge.com', 'https://prevaledge-agency-eynr-git-main-prevaledges-projects.vercel.app'];
  const origin = event.headers.origin;
  const headers = {
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  if (allowedOrigins.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
  }

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    const newDocument = {
      id: Date.now(), // Use numeric ID for consistency
      createdAt: new Date(),
      ...JSON.parse(event.body),
    };

    const db = await getDb();
    const collection = db.collection('documents');
    await collection.insertOne(newDocument);

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify(newDocument),
    };
  } catch (error) {
    console.error('Error creating document:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
    };
  }
};
