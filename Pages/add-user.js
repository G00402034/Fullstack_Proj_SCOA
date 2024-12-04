import { useState } from 'react';
import NavBar from '../components/NavBar';

function AddUser() {
  const [name, setName] = useState('');

  const addUser = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      alert('User added successfully!');
      setName('');
    } else {
      alert('Failed to add user.');
    }
  };

  return (
    <>
      <NavBar />
      <h1>Add a User</h1>
      <form onSubmit={addUser}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Add</button>
      </form>
    </>
  );
}

export default AddUser;
