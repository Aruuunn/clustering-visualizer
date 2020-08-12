import React from "react";

import NavBar from "./components/NavBar";
import Board from "./components/board";

function App() {
  return (
    <div style={{height:'100vh',overflow:'hidden'}}>
      <NavBar />
      <Board />
    </div>
  );
}

export default App;
