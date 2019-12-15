import React, { Component } from 'react';
import AnimesApi from './AnimesApi';
import Anime from './Anime';
import M from "materialize-css";
import './Anime.css';
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

  searchAnime(e) { //contact almacena el último contacto para el que se pulsó editar, y contactToEdit el que se ha pulsado ahora
    console.log(e.target.value)
    var searchText = e.target.value;
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

  render() {
    const listItems = this.state.animes.map((anime) =>
      <Anime key={anime.id} value={anime} />);
    return (
      <div>
        <nav className="anime-search">
          <div className="nav-wrapper">
            <form autocomplete="off">
              <div className="input-field">
                <input autocomplete="off" id="search" type="search" required onKeyUp={this.searchAnime} />
                <label className="label-icon"><i className="material-icons">search</i></label>
                <i className="material-icons">close</i>
              </div>
            </form>
          </div>
        </nav>
        <Row>
          {listItems}
        </Row></div>
    )
  }
}

export default Animes;