import React from 'react';
import AddTodo from './component/AddTodo';
import TodoList from './component/TodoList';
import VisibilityFilters from './component/VisibilityFilters';

function App() {
  return (
    <div className="App">
      <AddTodo />
      <TodoList />
      <VisibilityFilters />
    </div>
  );
}

export default App;
