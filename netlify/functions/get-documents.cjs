const { getDb } = require('../utils/mongodb.cjs');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
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
      body: JSON.stringify(documents),
    };
  } catch (error) {
    console.error('Error fetching documents:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
    };
  }
};
