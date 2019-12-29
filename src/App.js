import React, {Suspense, lazy} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import Animes from './components/anime/Animes'
import Profile from './components/profile/Profile'

//const Animes = lazy(() => import('./components/anime/Animes'));
//const Profile = lazy(() => import('./components/profile/Profile'));
//const Animes = import('./components/anime/Animes');
//const Profile = import('./components/profile/Profile');

function App() {
  return (
    //<div className="App">
    // <Animes />
    //</div>
    //<Suspense fallback={<div>Loading...</div>}>
    //</Suspense>
    <Router>
      
      <Switch>
        <Route exact path="/" component={Animes}/>
        <Route exact path="/myProfile" component={Profile}/>
      </Switch>
      
  </Router>
  );
}

export default App;
