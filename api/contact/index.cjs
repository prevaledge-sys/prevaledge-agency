const { getDb } = require('../utils/mongodb.cjs');

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
    const { name, organization, email, contactNumber, message } = JSON.parse(event.body);

    // Basic validation
    if (!name || !organization || !email || !contactNumber || !message) {
      return {
        statusCode: 400,
        headers,
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
      headers,
      body: JSON.stringify({ message: 'Submission successful!', submission: newSubmission }),
    };
  } catch (error) {
    console.error('Error during contact form submission:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
    };
  }
};
