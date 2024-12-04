import mongoose from 'mongoose';

// Ensure the mongoose connection is established
const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) return; // Already connected
  await mongoose.connect('mongodb://127.0.0.1:27017/projdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// Define the User Schema and Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

let User;

// Check if the User model already exists (for avoiding overwrite)
if (mongoose.models.User) {
  User = mongoose.models.User;  // Reuse the existing model
} else {
  User = mongoose.model('User', userSchema);  // Create the model
}

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    try {
      const user = new User({ name });
      await user.save();
      res.status(201).json({ message: 'User added successfully', user });
    } catch (error) {
      console.error('Error adding user:', error);
      res.status(500).json({ error: 'Failed to add user' });
    }
  } else if (req.method === 'GET') {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
