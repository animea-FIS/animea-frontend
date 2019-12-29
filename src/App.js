import React, {Suspense, lazy} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
//import Animes from './components/anime/Animes'

const Animes = lazy(() => import('./components/anime/Animes'));
const Profile = lazy(() => import('./components/profile/Profile'));


function App() {
  return (
    //<div className="App">
    // <Animes />
    //</div>
    <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Animes}/>
        <Route exact path="/myProfile" component={Profile}/>
      </Switch>
    </Suspense>
  </Router>
  );
}

export default App;
