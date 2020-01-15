import React, { Component } from 'react';
import FriendsApi from './FriendsApi';
import Anime from '../anime/Anime';
import M from "materialize-css";
import '../anime/Animes.css';
import { Row } from 'react-materialize';
import { AuthContext } from "../auth/context/auth";
import { Redirect } from "react-router-dom";
import { Switch, Route, withRouter, Link} from 'react-router-dom';

class FriendsAnimes extends Component {
  state = {
    animes: [],
  };

  constructor(props) {
    super(props);
    this.showFriendsList = this.showFriendsList.bind(this);
    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
    M.AutoInit();
    this.showFriendsList()
  }

  componentWillUnmount() {
  }

  showFriendsList() {
    FriendsApi.getFriendsAnimes(this.context.userId, this.context.authTokens)
      .then(
        (result) => {
          this.setState({
            animes: result,
          })
        },
        (error) => {
          this.setState(
            {error}
          );
        }
      )
  }


  render() {
    if (this.state.error) {
      return (<Redirect to={{pathname:"/error", state:{errorCode:this.state.error.status, errorMessage:this.state.error.statusText }}}/>)
    }
    
    const listItems = this.state.animes.map((anime) =>
      <Anime key={anime.id} value={anime} />);
    return (
      <div className="container">
    <h5 style={{fontWeigth: 'bold', fontFamily: 'Belgrano', fontSize: 37, color:'#1DB9D7'}}>User Anime List</h5>
        <div class="row" onScroll={this.handleScroll}>
          <div class="col s9">
            {listItems}
          </div>
        </div>
      </div>
    )
  }
}
FriendsAnimes.contextType = AuthContext;
export default withRouter(FriendsAnimes); 