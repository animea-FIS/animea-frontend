import React, { Component } from 'react';
import {
  Switch,
  Route,
  withRouter,
  Link
} from "react-router-dom";
import AnimesApi from './AnimesApi';
import AnimeInfo from './AnimeInfo';
import M from "materialize-css";
import './Anime.css';
import { Icon, CardTitle, Card, Row, Col } from 'react-materialize';
import { AuthContext } from "../auth/context/auth";
import { Redirect } from "react-router-dom";

class Anime extends Component {  
  state = {Anime}

  componentDidMount() {
    // Auto initialize all the things
    M.AutoInit();
  }

  /* updateStatus(animeId, e) {

    const anime = {
      anime_id: animeId,
      status: e
    }
    
    AnimesApi.updateAnimeFromList(anime, this.context.userId, this.context.authTokens).then(
      (result) => {},
      (error) => {
        this.setState(
          {error}
        );          
      }
    );
  }

  updateRating(animeId, e) {

    const anime = {
      anime_id: animeId,
      rating: e
    }
    
    AnimesApi.updateAnimeFromList(anime, this.context.userId, this.context.authTokens).then(
      (result) => {
        console.log(result)
      },
      (error) => {
        console.log(error)
        this.setState(
          {error}
        );          
      }
    );
  } */

  cutSynopsis(synopsis) {
    var shortSynopsis = synopsis;
    if (synopsis.length > 380) {
      shortSynopsis = synopsis.substring(0, 380) + "...";
    }
    return shortSynopsis;
  }

  render() {
    if (this.state.error) {
      return (<Redirect to={{pathname:"/error", state:{errorCode:this.state.error.status, errorMessage:this.state.error.statusText }}}/>)
    }
    return (
      <Row>
        <Card
          header={<CardTitle image={this.props.value.attributes.posterImage.small} />}
          horizontal
        >
          <h5 style={{fontWeigth: 'bold', fontFamily: 'Belgrano'}}><Link to={`/animes/${this.props.value.id}`}>
            {this.props.value.attributes.titles.en_jp}
            </Link></h5>
          <p>{this.cutSynopsis(this.props.value.attributes.synopsis)}</p>
        </Card>
      </Row>

    )
  }
}

Anime.contextType = AuthContext;
export default withRouter(Anime);