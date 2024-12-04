import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({ error: 'Name is required' });
      return;
    }

    try {
      const client = new MongoClient(uri);
      await client.connect();
      const db = client.db('projdb');
      const result = await db.collection('users').insertOne({ name });
      client.close();

      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to connect to database' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
