import React, { Component } from 'react';
import AnimesApi from './AnimesApi';
import Anime from './Anime';
import M from "materialize-css";
import './Animes.css';
import { Row } from 'react-materialize';
import ReactPaginate from 'react-paginate';

class Animes extends Component {
  state = {
    animes: [],
    pageNumber: 0,
    windowsSize: document.documentElement.clientHeight,
    userList: false,
    searchAnimesFunction: this.searchAllAnimes
  };

  constructor(props) {
    super(props);
    this.getAllAnimes = this.getAllAnimes.bind(this);
    this.searchAllAnimes = this.searchAllAnimes.bind(this);
    this.showUserList = this.showUserList.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
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
    AnimesApi.getAllAnimes(this.state.pageNumber)
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
    AnimesApi.searchAllAnimes(searchText)
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
    var userId = 1;
    AnimesApi.getUserAnimes(userId)
      .then(
        (result) => {
          console.log(result)
          this.setState({
            animes: result,
            userList: true,
            searchAnimesFunction: this.searchUserAnimes,
            pageNumber: 0
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

  addAnimeToList() {
    var userId = 1;
    AnimesApi.addAnimeToUserList(userId).then(
      (result) => {
        console.log(result);
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

  handleChange(e) {
    var searchText = e.target.value;
    if (searchText.length > 4) {
      console.log(searchText)
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
    if (this.state.userList) {
      listMsg = "All animes";
    } else {
      listMsg = "My list";
    }

    const listItems = this.state.animes.map((anime) =>
      <Anime key={anime.id} value={anime} />);
    return (
      <div>
        <div className="row valign-wrapper">
          <div className="col s10">
            <nav className="anime-search">
              <div className="nav-wrapper">
                <form autoComplete="off">
                  <div className="input-field">
                    <input autoComplete="off" id="search" type="search" required onKeyUp={this.handleChange} />
                    <label className="label-icon"><i className="material-icons">search</i></label>
                    <i className="material-icons">close</i>
                  </div>
                </form>
              </div>
            </nav>
          </div>
          <div className="col s2">
            <button onClick={this.state.userList ? () => this.getAllAnimes() : () => this.showUserList()} className="btn waves-effect waves-light" type="submit" name="action">{listMsg}
              <i className="material-icons right">library_books</i>
            </button>
          </div>
        </div>
        <Row onScroll={this.handleScroll}>
          {listItems}
        </Row>
      </div>
    )
  }
}

export default Animes; 