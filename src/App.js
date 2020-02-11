import React from 'react';
import './App.css';
import CreateRecipe from './Functions/CreateRecipe';
import * as firebase from 'firebase';
import config from './config';

function App() {

firebase.initializeApp(config);
  return (
    
    <div className="App">

      <CreateRecipe/>

    </div>
  );
}

export default App;
