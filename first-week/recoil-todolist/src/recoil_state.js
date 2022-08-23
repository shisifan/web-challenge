import { atom, selector } from "recoil";
import { StateKey, Show } from "./constants.ts";

// 一个 atom 代表一个状态。Atom 可在任意组件中进行读写
const todoListState = atom({
  key: StateKey.todoListState,
  default: [],
});

const todoListFilterState = atom({
  key: StateKey.todoListFilterState,
  default: Show.All,
});

// selector 代表一个派生状态，派生状态是状态的转换
const filteredTodoListState = selector({
  key: StateKey.filteredTodoListState,
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case Show.Completed:
        return list.filter((item) => item.isComplete);
      case Show.Uncompleted:
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});

const todoListStatsState = selector({
  key: StateKey.todoListStatsState,
  get: ({ get }) => {
    const todoList = get(todoListState);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
    todoList.filter((item) => !item.isComplete);
    const allText = todoList.reduce((pre, cur) => {
      return pre.concat(cur.text);
    }, []);
    const totalUncompletedNum = totalNum - totalCompletedNum;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      allText,
    };
  },
});

export {
  todoListState,
  todoListFilterState,
  filteredTodoListState,
  todoListStatsState,
};
