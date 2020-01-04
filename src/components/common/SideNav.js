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

class SideNav extends React.Component {
    render() {
      return (
        <Router>
      <div>
        <nav class="yellow darken-2">
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
              <Link to="/meetings">Meetings</Link>
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
          <Route exact path="/">
            <Animes />
          </Route>
          <Route exact path="/meetings">
            <Meetings />
          </Route>
          <Route exact path="/meetings/create-meeting">
            <MeetingCreation />
          </Route>
          <Route path={`/meetings/:meetingId`}>
            <MeetingInfo/>
          </Route>
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
      );
    }
  }

  export default SideNav;