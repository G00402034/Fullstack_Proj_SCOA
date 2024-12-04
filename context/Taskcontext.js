import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const addTask = async (task) => {
    try {
      const userId = '12345'; // Replace with actual user ID from session/auth context
      const { data } = await axios.post('Pages\api\tasks.js', { ...task, userId });
      setTasks((prevTasks) => [...prevTasks, data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };
  

  // Fetch tasks
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('Pages\api\tasks.js');
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add a new task
  const addTask = async (task) => {
    try {
      const { data } = await axios.post('Pages\api\tasks.js', task);
      setTasks((prevTasks) => [...prevTasks, data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Update a task
  const updateTask = async (id, updatedTask) => {
    try {
      const { data } = await axios.put('Pages\api\tasks.js', { id, ...updatedTask });
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? data : task))
      );
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await axios.delete('Pages\api\tasks.js', { data: { id } });
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <TaskContext.Provider
      value={{ tasks, fetchTasks, addTask, updateTask, deleteTask, loading }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
