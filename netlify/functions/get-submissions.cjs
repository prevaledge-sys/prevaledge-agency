const { getDb } = require('./utils/mongodb');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    const db = await getDb();
    const collection = db.collection('submissions');
    const submissions = await collection.find({}).toArray();

    return {
      statusCode: 200,
      body: JSON.stringify(submissions),
    };
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
    };
  }
};
