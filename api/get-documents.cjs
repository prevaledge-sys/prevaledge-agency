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
    const { documentType, searchTerm } = event.queryStringParameters;
    const query = {};

    if (documentType && documentType !== 'All') {
      query.documentType = documentType;
    }

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      query.$or = [
        { clientName: { $regex: lowerCaseSearchTerm, $options: 'i' } },
        { documentNumber: { $regex: lowerCaseSearchTerm, $options: 'i' } },
      ];
    }

    const db = await getDb();
    const collection = db.collection('documents');
    const documents = await collection.find(query).toArray();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(documents),
    };
  } catch (error) {
    console.error('Error fetching documents:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
    };
  }
};
