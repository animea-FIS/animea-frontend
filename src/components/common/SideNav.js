import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import 'materialize-css/dist/css/materialize.min.css';
import Animes from '../anime/Animes';
import AnimeInfo from '../anime/AnimeInfo';
import UserAnimes from '../anime/UserAnimes';
import Meetings from '../meeting/Meetings';
import MeetingInfo from '../meeting/MeetingInfo';
import MeetingCreation from '../meeting/MeetingCreation';
import MeetingEdition from '../meeting/MeetingEdition';
import Friends from '../friend/Friends';
import Requests from '../request/Requests';
import RequestInfo from '../request/RequestInfo';
import RequestCreation from '../request/RequestCreation';
import NotFound from '../common/NotFound';
import Error from '../common/Error';
import Profile from '../profile/Profile';
import MyProfile from '../profile/MyProfile';
import PrivateRoute from '../auth/PrivateRoute';
import Login from '../auth/Login';
import { useAuth } from "../auth/context/auth";
import Cookies from 'js-cookie';
import {
  Redirect
} from "react-router-dom";

function SideNav() {
  const { authTokens, setAuthTokens, setUserId, userId } = useAuth();
  const [toLogin, setToLogin] = useState(false);

  function logOut() {
    Cookies.remove('userToken');
    Cookies.remove('userId');
    setUserId();
    setAuthTokens();
    setToLogin(true)
  }

  var navLinks;
  if (authTokens!=='undefined' && Cookies.get('userToken')!=='undefined'
        && authTokens!==undefined && Cookies.get('userToken')!==undefined) {
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
      <li>
        <Link to="/friends">Friends</Link>
      </li>
      <li>
        <Link to="/requests">Requests</Link>
      </li>
      <li>
        <Link to="/my-profile">My profile</Link>
      </li>
      <li><a className="loginLink" onClick={logOut}>Log out</a></li>
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
        <Link to="/meetings">Meetings</Link>
      </li>
      <li>
        <Link to="/friends">Friends</Link>
      </li>
      <li>
        <Link to="/requests">Requests</Link>
      </li>
      <li className="loginLink">
        <Link to="/login">Login</Link>
      </li>
      </ul>
    )
  }
  var redirect = '';
  if(toLogin){
     redirect = <Redirect to="/login" />;
  }

  return (
    <Router>
      {redirect}
      <div>
        <nav className="yellow darken-2">
          <a href="/" className="brand-logo"><img width="150" height="auto" src={window.location.origin + "/logo.png"} /></a>
          {navLinks}
        </nav>
        <Switch>
          <Route exact path="/animes">
            <Animes />
          </Route>
          <Route path={`/animes/:animeId`}>
            <AnimeInfo />
          </Route>
          <Route path={`/user/:userId/animes`}>
            <UserAnimes />
          </Route>
          <PrivateRoute exact path="/users" />
          <Route exact path="/">
            <Animes />
          </Route>
          <Route exact path="/meetings" component={Meetings} />
          <PrivateRoute exact path="/meetings/create-meeting" component={MeetingCreation}/>
          <PrivateRoute exact path="/meetings/edit-meeting" component={MeetingEdition}/>
          <Route path={`/meetings/:meetingId`}>
            <MeetingInfo />
          </Route>
          <Route path="/my-profile">
            <MyProfile />
          </Route>
          <Route path="/profile/:profileId">
            <Profile />
          </Route>
          <Route path="/login" component={Login} />
          <Route exact path="/friends">
            <Friends />
          </Route>
          <Route exact path="/requests">
            <Requests />
          </Route>
          <Route exact path="/requests/:requestId">
            <RequestInfo />
          </Route>
          <Route exact path="/error">
            <Error />
          </Route>
          <Route exact path="/requests/new/:friendId">
            <RequestCreation />
          </Route>
          <Route exact path="/requests/edit/:reqId">
            <RequestCreation />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default SideNav;