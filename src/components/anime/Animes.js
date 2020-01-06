import React, { Component } from 'react';
import AnimesApi from './AnimesApi';
import Anime from './Anime';
import M from "materialize-css";
import './Animes.css';
import { Row } from 'react-materialize';
import { AuthContext } from "../auth/context/auth";
import { Redirect } from "react-router-dom";

class Animes extends Component {
  state = {
    animes: [],
    pageNumber: 0,
    windowsSize: document.documentElement.clientHeight,
    userList: false,
    searchAnimesFunction: this.searchAllAnimes.bind(this),
    genre: false,
    status: false,
    searchText: false
  };

  constructor(props) {
    super(props);
    this.getAllAnimes = this.getAllAnimes.bind(this);
    this.searchAllAnimes = this.searchAllAnimes.bind(this);
    this.showUserList = this.showUserList.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleGenreChange = this.handleGenreChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.setState = this.setState.bind(this)
  }

  componentDidMount() {
    M.AutoInit();
    window.addEventListener('scroll', this.handleScroll);
    this.getAllAnimes();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  getAllAnimes() {
    AnimesApi.getAllAnimes(this.state.pageNumber, this.state.genre, this.state.status, this.state.searchText)
      .then(
        (result) => {
          var foundAnimes = []
          if (this.state.animes.length > 0 && !this.state.userList) {
            foundAnimes = this.state.animes.concat(result);
          } else {
            foundAnimes = result;
          }
          this.setState({
            animes: foundAnimes,
            userList: false
          })

        },
        (error) => {
          console.log(error)
          this.setState({
            errorInfo: "Problem with connection to server"
          })
        }
      )
  }

  searchAllAnimes(searchText) {
    AnimesApi.getAllAnimes(this.state.pageNumber, this.state.genre, this.state.status, searchText)
      .then(
        (result) => {
          this.setState({
            animes: result
          })
        },
        (error) => {
          console.log(error)
          this.setState({
            errorInfo: "Problem with connection to server"
          })
        }
      )
  };

  showUserList() {
    AnimesApi.getUserAnimes(this.context.userId, this.context.authTokens)
      .then(
        (result) => {
          this.setState({
            animes: result,
            userList: true,
            searchAnimesFunction: this.searchUserAnimes,
            pageNumber: 0
          })
        },
        (error) => {
          this.setState(
            {error}
          );          
        }
      )
  }

  addAnimeToList() {
    var userId = 1;
    AnimesApi.addAnimeToUserList(userId).then(
      (result) => {
        this.setState({
          animes: result
        })
      },
      (error) => {
        console.log(error);
        this.setState({
          errorInfo: "Connection problem"
        })
      }
    )
  }

  handleGenreChange(e) {
    var genre = e.target.value;
    this.setState({
      pageNumber: 0,
      genre: genre
    })
    console.log( this.state.searchText)
    AnimesApi.getAllAnimes(this.state.pageNumber, genre, this.state.status, this.state.searchText)
      .then(
        (result) => {
          console.log(result)
          this.setState({
            animes: result,
            userList: false
          })

        },
        (error) => {
          console.log(error)
          this.setState({
            errorInfo: "Problem with connection to server"
          })
        }
      )
  }

  handleStatusChange(e) {
    var status = e.target.value;
    this.setState({
      pageNumber: 0,
      status: status
    })
    console.log( this.state.searchText)
    AnimesApi.getAllAnimes(this.state.pageNumber, this.state.genre, status, this.state.searchText)
      .then(
        (result) => {
          console.log(result)
          this.setState({
            animes: result,
            userList: false
          })

        },
        (error) => {
          console.log(error)
          this.setState({
            errorInfo: "Problem with connection to server"
          })
        }
      )
  }

  handleTextChange(e) {
    var searchText = e.target.value;
    if (searchText.length > 4) {
      this.setState({
        searchText: searchText
      })
      this.state.searchAnimesFunction(searchText)
    }
  }

  handleScroll = (e) => {
    if (!this.state.userList) {
      const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      const windowBottom = windowHeight + window.pageYOffset;
      if (Math.ceil(windowBottom) >= docHeight) { // && this.state.windowsSize != html.clientHeight
        this.setState({
          pageNumber: this.state.pageNumber + 10,
          windowsSize: html.clientHeight
        })
        this.getAllAnimes();
      }
    }
  }

  render() {
    var listMsg;
    var myListButton = '';
    var searchBar = (<nav className="anime-search">
    <div className="nav-wrapper">
      <form autoComplete="off">
        <div className="input-field">
          <input autoComplete="off" id="search" type="search" placeholder="Search animes" required onKeyUp={this.handleTextChange} />
          <label className="label-icon"><i className="material-icons">search</i></label>
        </div>
      </form>
    </div>
  </nav>)
  var filters = (<div className="col s3">
  <div class="search-filters">
  <div class="input-field col s12">
    <select onChange={this.handleGenreChange}>
      <option value="" disabled selected>Genre</option>
      <option value="action">Action</option>
      <option value="adventure">Adventure</option>
      <option value="school">School</option>
      <option value="comedy">Comedy</option>
      <option value="drama">Drama</option>
      <option value="fantasy">Fantasy</option>
      <option value="magic">Magic</option>
      <option value="horror">Horror</option>
      <option value="mystery">Mystery</option>
      <option value="music">Music</option>
      <option value="psychological">Psychological</option>
      <option value="romance">Romance</option>
      <option value="sci-fi">Sci-Fi</option>
      <option value="yaoi">Yaoi</option>
      <option value="yuri">Yuri</option>
    </select>
    <label>Genre</label>
  </div>
  <div class="input-field col s12">
    <select onChange={this.handleStatusChange}>
      <option value="" disabled selected>Status</option>
      <option value="current">Current</option>
      <option value="finished">Finished</option>
      <option value="tba">TBA</option>
      <option value="unreleased">Unreleased</option>
      <option value="upcoming">Upcoming</option>
    </select>
    <label>Status</label>
  </div>
  </div>
</div>)
    if (this.state.userList) {
      listMsg = "All animes";
      searchBar = (<h5 style={{fontWeigth: 'bold', fontFamily: 'Belgrano', fontSize: 37, color:'#1DB9D7'}}>My Anime List</h5>)
      filters = "";
    } else {
      listMsg = "My list";
    }

    if(this.context.authTokens){
      myListButton = (<div className="col s2">
      <button onClick={this.state.userList ? () => this.getAllAnimes() : () => this.showUserList()} className="btn waves-effect waves-light" type="submit" name="action">{listMsg}
        <i className="material-icons right">library_books</i>
      </button>
    </div>)
    }

    if (this.state.error) {
      return (<Redirect to={{pathname:"/error", state:{errorCode:this.state.error.status, errorMessage:this.state.error.statusText }}}/>)
    }
    
    const listItems = this.state.animes.map((anime) =>
      <Anime key={anime.id} value={anime} />);
    return (
      <div className="container">
        <div className="row valign-wrapper">
          <div className="col s10">
            {searchBar}
          </div>
          {myListButton}
        </div>
        <div class="row" onScroll={this.handleScroll}>
          {filters}
          <div class="col s9">
            {listItems}
          </div>
        </div>
      </div>
    )
  }
}
Animes.contextType = AuthContext;
export default Animes; 