import { atom, selector } from "recoil";

// 一个 atom 代表一个状态。Atom 可在任意组件中进行读写
const todoListState = atom({
  key: "todoListState",
  default: [],
});

const todoListFilterState = atom({
  key: "todoListFilterState",
  default: "Show All",
});

// selector 代表一个派生状态，派生状态是状态的转换
const filteredTodoListState = selector({
  key: "filteredTodoListState",
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case "Show Completed":
        return list.filter((item) => item.isComplete);
      case "Show Uncompleted":
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});

const todoListStatsState = selector({
  key: "todoListStatsState",
  get: ({ get }) => {
    const todoList = get(todoListState);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
    let allText = "";
    todoList
      .filter((item) => !item.isComplete)
      .map((item) => (allText = allText + " " + item.text));
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
