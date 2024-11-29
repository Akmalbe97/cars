const { MongoClient } = require('mongodb');

const uri = process.env.MONGOURI; 
const dbName = 'test'; 
const collectionName = 'log';

const getLogs = async (req, res, next) => {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    await client.connect(); 
    const db = client.db(dbName); 
    const collection = db.collection(collectionName);

    const logs = await collection.find().sort({ timestamp: -1 }).limit(100).toArray();
    res.status(200).json(logs);
  } catch (error) {
    console.error('Error fetching logs:', error);
    next(error);
  } finally {
    await client.close();
  }
};

module.exports = getLogs;
