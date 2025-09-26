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
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    const db = await getDb();
    const collection = db.collection('submissions');
    const submissions = await collection.find({}).toArray();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(submissions),
    };
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
    };
  }
};
