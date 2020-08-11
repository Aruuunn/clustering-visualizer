import React , { useState } from 'react';

import NavBar from './components/NavBar';
import Board from './components/board';
import { AlgorithmNames } from './common/algorithms.enum';

//import './App.module.css';

function App() {
  const [state,setState] = useState({algorithm:null,numberOfClusters:0,start:false});

  return (
    <div>
      <NavBar state={state} setState ={setState}/>
      <Board algorithm={AlgorithmNames.KMEANS} numberOfClusters={state.numberOfClusters}/>
    </div>
  );
}

export default App;
