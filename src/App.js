import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import Animes from './components/anime/Animes';
import AnimeInfo from './components/anime/AnimeInfo';
import NotFound from './components/common/NotFound';
import SideNav from './components/common/SideNav';

function App() {
  return (
    <SideNav />

  );
}

export default App;
