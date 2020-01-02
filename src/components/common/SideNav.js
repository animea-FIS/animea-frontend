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
import NotFound from '../common/NotFound';
import Profile from '../profile/Profile';

class SideNav extends React.Component {
    render() {
      return (
        <Router>
      <div>
        <nav class="pink lighten-3">
        <a href="/" class="brand-logo"><img width="150" height="auto" src={window.location.origin + "/logo.png"}/></a>
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
              <Link to="/my-profile">My profile</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/animes">
            <Animes />
          </Route>
          <Route path={`/animes/:animeId`}>
            <AnimeInfo/>
          </Route>
          <Route path="/users">
          </Route>
          <Route path="/my-profile">
            <Profile/>
          </Route>
          <Route exact path="/">
            <Animes />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
      );
    }
  }

  export default SideNav;