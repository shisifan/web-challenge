import React from "react";
import { useRecoilValue } from "recoil";
import { todoListStatsState } from "../recoil_state";

const TodoListStats = () => {
  const { totalNum, totalCompletedNum, totalUncompletedNum, allText } =
    useRecoilValue(todoListStatsState);
  return (
    <ul>
      <li>Total items: {totalNum}</li>
      <li>Items completed: {totalCompletedNum}</li>
      <li>Items not completed: {totalUncompletedNum}</li>
      <li>Text not completed: {allText.join(" ")}</li>
    </ul>
  );
};

export default TodoListStats;
