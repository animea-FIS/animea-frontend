import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import 'materialize-css/dist/css/materialize.min.css';
import Animes from '../anime/Animes';
import AnimeInfo from '../anime/AnimeInfo';
import Meetings from '../meeting/Meetings';
import MeetingInfo from '../meeting/MeetingInfo';
import NotFound from '../common/NotFound';
import PrivateRoute from '../auth/PrivateRoute';
import Login from '../auth/Login';
import { useAuth } from "../auth/context/auth";


function SideNav() {
  const { authTokens, setAuthTokens } = useAuth();

  function logOut() {
    setAuthTokens();
  }

  var navLinks;
  if (authTokens) {
    navLinks = (
      <ul className="right sideNav">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/animes">Animes</Link>
      </li>
      <li>
        <Link to="/users">Users</Link>
      </li>
      <li>
        <Link to="/meetings">Meetings</Link>
      </li>
      <li><button onClick={logOut}>Log out</button></li>
      </ul>
      )
  } else {
    navLinks = (
      <ul className="right sideNav">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/animes">Animes</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      </ul>
    )
  }
  return (
    <Router>
      <div>
        <nav class="yellow darken-2">
          <a href="/" class="brand-logo"><img width="150" height="auto" src={window.location.origin + "/logo.png"} /></a>
          {navLinks}
        </nav>
        <Switch>
          <Route exact path="/animes">
            <Animes />
          </Route>
          <Route path={`/animes/:animeId`}>
            <AnimeInfo />
          </Route>
          <PrivateRoute exact path="/users" />
          <Route exact path="/">
            <Animes />
          </Route>
          <PrivateRoute exact path="/meetings" component={Meetings} />
          <Route path={`/meetings/:meetingId`}>
            <MeetingInfo />
          </Route>
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default SideNav;