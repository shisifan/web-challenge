import TodoList from "./component/TodoList";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <TodoList />
      </RecoilRoot>
    </div>
  );
}

export default App;
