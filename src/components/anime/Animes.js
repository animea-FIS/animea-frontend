import React, { Component } from 'react';
import AnimesApi from './AnimesApi';
import Anime from './Anime';
import M from "materialize-css";
import './Anime.css';


class Animes extends Component {
  state = {
    animes: []//this.props.value.contacts
  };
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

  render() {
    const listItems = this.state.animes.map((anime) =>
      <Anime key={anime.id} value={anime} />);
    return (
      <div>
        {listItems}
      </div>
    )
  }
}

export default Animes;