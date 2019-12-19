import React, { Component } from 'react';
import AnimesApi from './AnimesApi';
import Anime from './Anime';
import M from "materialize-css";
import './Animes.css';
import { Row } from 'react-materialize';

class Animes extends Component {
  state = {
    animes: [], //this.props.value.contacts
    typing: false,
    typingTimeout: 0
  };

  constructor(props) {
    super(props);
    this.searchAnime = this.searchAnime.bind(this);
    this.showMyList = this.showMyList.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    // Auto initialize all the things
    M.AutoInit();
    AnimesApi.getAllAnimes()
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
  }

  searchAnime(searchText) { //contact almacena el último contacto para el que se pulsó editar, y contactToEdit el que se ha pulsado ahora
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

  showMyList() { //contact almacena el último contacto para el que se pulsó editar, y contactToEdit el que se ha pulsado ahora
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

  handleChange(e) {
    var searchText = e.target.value;
    setTimeout(() => {
      console.log(searchText)
      this.searchAnime(searchText)
    }, 3000)
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
            <form autocomplete="off">
              <div className="input-field">
                <input autocomplete="off" id="search" type="search" required onKeyUp={this.handleChange} />
                <label className="label-icon"><i className="material-icons">search</i></label>
                <i className="material-icons">close</i>
              </div>
            </form>
          </div>
        </nav>
        </div>
        <div class="col s2">
        <button onClick={() => this.showMyList()} class="btn waves-effect waves-light" type="submit" name="action">My list
        <i class="material-icons right">library_books</i>
        </button>
        </div>
        </div>
        <Row>
          {listItems}
        </Row>
        </div>
    )
  }
}

export default Animes;