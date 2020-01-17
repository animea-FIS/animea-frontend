import React, { Component } from 'react';
import AnimesApi from './AnimesApi';
import Anime from './Anime';
import M from "materialize-css";
import './Animes.css';
import { Row } from 'react-materialize';
import { AuthContext } from "../auth/context/auth";
import { Redirect } from "react-router-dom";
import { Switch, Route, withRouter, Link} from 'react-router-dom';

class UserAnimes extends Component {
  state = {
    animes: [],
  };

  constructor(props) {
    super(props);
    this.showUserList = this.showUserList.bind(this);
    this.setState = this.setState.bind(this)
  }

  componentDidMount() {
    M.AutoInit();
    this.showUserList()
  }

  componentWillUnmount() {
  }

  showUserList() {
    AnimesApi.getUserAnimes(this.props.match.params.userId, this.context.authTokens)
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
UserAnimes.contextType = AuthContext;
export default withRouter(UserAnimes); 