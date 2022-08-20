import React from "react";
import { useRecoilValue } from "recoil";
import TodoListStats from "./TodoListStats";
import TodoListFilters from "./TodoListFilters";
import TodoItemCreator from "./TodoItemCreator";
import TodoItem from "./TodoItem";
import { filteredTodoListState } from "../recoil_state";

const TodoList = () => {
  const todoList = useRecoilValue(filteredTodoListState);
  return (
    <>
      {/* 展示相应数量 */}
      <TodoListStats /> 
      {/* 选择全部 完成 未完成 */}
      <TodoListFilters />
      {/* 添加新任务 */}
      <TodoItemCreator />
      {todoList.map((todoItem) => (
        <TodoItem item={todoItem} key={todoItem.id} />
      ))}
    </>
  );
};

export default TodoList;
