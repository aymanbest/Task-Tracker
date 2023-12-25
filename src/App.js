import './App.css';
import React from 'react';
import TaskList from './componenets/TaskList';
import NewTaskForm from './componenets/NewTaskForm';

function App() {

  return (
    <div>
      <h1>Task Tracker</h1>
      <NewTaskForm />
      <TaskList />
    </div>
  );
}

export default App;
