const { getDb } = require('../utils/mongodb.cjs');
const { ObjectId } = require('mongodb');

exports.handler = async (event, context) => {
  const allowedOrigins = ['https://prevaledge.com', 'https://prevaledge-agency-eynr-git-main-prevaledges-projects.vercel.app'];
  const origin = event.headers.origin;
  const headers = {
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, DELETE, PUT',
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

  const { id } = event.queryStringParameters;

  if (event.httpMethod === 'PUT') {
    try {
      const updatedService = JSON.parse(event.body);
      const db = await getDb();
      const collection = db.collection('services');
      const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updatedService });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(result),
      };
    } catch (error) {
      console.error('Error updating service:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
      };
    }
  }

  return {
    statusCode: 405,
    headers,
    body: 'Method Not Allowed',
  };
};