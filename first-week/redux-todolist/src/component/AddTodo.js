import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodo } from "../redux/actions";

const AddTodo = ({ addTodo }) => {
  const [inputValue, setInputValue] = useState("");
  const handleUpdateInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodoChange = () => {
    addTodo(inputValue);
    setInputValue("");
  };

  return (
    <div>
      <input onChange={handleUpdateInputChange} value={inputValue} />
      <button onClick={handleAddTodoChange}>Add Todo</button>
    </div>
  );
};

export default connect(null, { addTodo })(AddTodo);
