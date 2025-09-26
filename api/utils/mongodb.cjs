const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let client;
let clientPromise;

async function connectToDatabase() {
  if (clientPromise) {
    return clientPromise;
  }

  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  clientPromise = client.connect();
  return clientPromise;
}

module.exports = {
  connectToDatabase,
  getDb: async (dbName = 'prevaledge_db') => {
    const client = await connectToDatabase();
    return client.db(dbName);
  }
};
