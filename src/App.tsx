import React from "react";
import TodoListPage from "./components/TodoListPage";
import { RecoilRoot } from "recoil";
import "./App.css";


function App() {
  return (
    <RecoilRoot>
      <TodoListPage/>
    </RecoilRoot>
  );
}

export default App;
