import React from 'react';
import logo from './logo.svg';
import Todo from './components/Todo';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className='App-header'>
        <h4>Todo App</h4>
        <Todo />
      </header>
    </div>
  );
}

export default App;
