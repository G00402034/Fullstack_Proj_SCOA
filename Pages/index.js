import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

export default function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Task Management</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
}
