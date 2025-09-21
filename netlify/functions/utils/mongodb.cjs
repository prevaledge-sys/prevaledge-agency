const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://prevaledge_db_user:db_Kori161098@cluster0.3zo2guo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
