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
import MeetingCreation from '../meeting/MeetingCreation';
import NotFound from '../common/NotFound';
import Profile from '../profile/Profile';
import PrivateRoute from '../auth/PrivateRoute';
import Login from '../auth/Login';
import { useAuth } from "../auth/context/auth";
import Cookies from 'js-cookie';

function SideNav() {
  const { authTokens, setAuthTokens, setUserId } = useAuth();

  function logOut() {
    Cookies.remove('userToken');
    Cookies.remove('userId');
    setUserId();
    setAuthTokens();
  }

  var navLinks;
  if (authTokens!=='undefined' && Cookies.get('userToken')!=='undefined') {
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
      <li>
        <Link to="/my-profile">My profile</Link>
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
          <Route exact path="/meetings" component={Meetings} />
          <Route exact path="/meetings/create-meeting">
            <MeetingCreation />
          </Route>
          <Route path={`/meetings/:meetingId`}>
            <MeetingInfo />
          </Route>
          <Route exact path="/my-profile">
            <Profile />
          </Route>
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default SideNav;