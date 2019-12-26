import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import Animes from './components/anime/Animes';
import Profiles from './components/profile/Profile';

function App() {
  return (
    <div className="App">
      <Profiles/>
    </div>
  );
}

export default App;
