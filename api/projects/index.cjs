const { getDb } = require('../utils/mongodb.cjs');

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

  if (event.httpMethod === 'GET') {
    try {
      const db = await getDb();
      const collection = db.collection('projects');
      const projects = await collection.find({}).toArray();

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(projects),
      };
    } catch (error) {
      console.error('Error fetching projects:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
      };
    }
  }

  if (event.httpMethod === 'POST') {
    try {
      const newProject = JSON.parse(event.body);
      const db = await getDb();
      const collection = db.collection('projects');
      const result = await collection.insertOne(newProject);

      const insertedDoc = await collection.findOne({ _id: result.insertedId });
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(insertedDoc),
      };
    } catch (error) {
      console.error('Error adding project:', error);
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