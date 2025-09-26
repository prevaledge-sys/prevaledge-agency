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
      const collection = db.collection('blog');
      const blogPosts = await collection.find({}).toArray();

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(blogPosts),
      };
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
      };
    }
  }

  if (event.httpMethod === 'POST') {
    try {
      const newPost = JSON.parse(event.body);
      const db = await getDb();
      const collection = db.collection('blog');
      const result = await collection.insertOne(newPost);

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(result.ops[0]),
      };
    } catch (error) {
      console.error('Error adding blog post:', error);
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