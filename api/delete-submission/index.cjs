const { getDb } = require('../utils/mongodb.cjs');
const { ObjectId } = require('mongodb');

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
  if (event.httpMethod !== 'DELETE') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    const id = event.path.split('/').pop(); // Extract ID from path

    if (!id) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Submission ID is required.' }),
      };
    }

    const db = await getDb();
    const collection = db.collection('submissions');

    // MongoDB uses ObjectId for _id, so we need to convert the string ID
    const result = await collection.deleteOne({ id: parseInt(id) });

    if (result.deletedCount === 1) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: 'Submission deleted successfully.' }),
      };
    } else {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ message: 'Submission not found.' }),
      };
    }
  } catch (error) {
    console.error('Error deleting submission:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
    };
  }
};
