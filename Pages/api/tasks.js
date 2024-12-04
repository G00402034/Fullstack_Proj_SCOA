import dbConnect from '../../utils/dbConnect';
import Task from '/../models/Task';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const { title, description, completed, userId } = req.body;

      // Validate input
      if (!title) {
        return res.status(400).json({ error: 'Title is required' });
      }
      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }

      // Create a new task
      const task = await Task.create({ title, description, completed, userId });
      res.status(201).json(task);
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ error: 'Server error while creating task' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
