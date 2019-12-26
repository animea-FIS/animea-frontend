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
    windowsSize: document.documentElement.clientHeight
  };

  constructor(props) {
    super(props);
    this.getAllAnimes = this.getAllAnimes.bind(this);
    this.searchAnimes = this.searchAnimes.bind(this);
    this.showMyList = this.showMyList.bind(this);
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

  getAllAnimes(){
    AnimesApi.getAllAnimes(this.state.pageNumber)
      .then(
        (result) => {
          var foundAnimes = []
          if (this.state.animes.length > 0) {
            foundAnimes = this.state.animes.concat(result);
          } else {
            foundAnimes = result;
          }
          this.setState({
            animes: foundAnimes,
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

  searchAnimes(searchText) { 
    AnimesApi.searchAnimes(searchText)
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

  showMyList() { 
    var userId = 1;
    AnimesApi.searchUserAnimes(userId)
      .then(
        (result) => {
          console.log(result)
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
      this.searchAnimes(searchText)
    }
  }

  handleScroll = (e) => {
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

  render() {
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
            <button onClick={() => this.showMyList()} className="btn waves-effect waves-light" type="submit" name="action">My list
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