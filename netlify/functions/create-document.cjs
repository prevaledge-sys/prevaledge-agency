const { getDb } = require('./utils/mongodb');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
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
      body: JSON.stringify(newDocument),
    };
  } catch (error) {
    console.error('Error creating document:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
    };
  }
};
