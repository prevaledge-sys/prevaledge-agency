const { getDb } = require('./utils/mongodb.cjs');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'DELETE') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    const id = event.path.split('/').pop(); // Extract ID from path

    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Document ID is required.' }),
      };
    }

    const db = await getDb();
    const collection = db.collection('documents');

    const result = await collection.deleteOne({ id: parseInt(id) });

    if (result.deletedCount === 1) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Document deleted successfully.' }),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Document not found.' }),
      };
    }
  } catch (error) {
    console.error('Error deleting document:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
    };
  }
};
