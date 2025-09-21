const { getDb } = require('../utils/mongodb');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    const { name, organization, email, contactNumber, message } = JSON.parse(event.body);

    // Basic validation
    if (!name || !organization || !email || !contactNumber || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'All fields are required.' }),
      };
    }

    const newSubmission = {
      id: Date.now(), // Add numeric ID
      submittedAt: new Date(),
      name,
      organization,
      email,
      contactNumber,
      message,
    };

    const db = await getDb();
    const collection = db.collection('submissions');
    await collection.insertOne(newSubmission);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Submission successful!', submission: newSubmission }),
    };
  } catch (error) {
    console.error('Error during contact form submission:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
    };
  }
};
