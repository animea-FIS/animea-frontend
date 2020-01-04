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

class Anime extends Component {  
  componentDidMount() {
    // Auto initialize all the things
    M.AutoInit();
  }

  render() {
    const { path, url } = this.props.match;

    return (
      <Row>
        <Card
          actions={[
            <a key="1" href="#" onClick={() => AnimesApi.addAnimeToUserList(this.props.value.id)} >
              <i className="material-icons">add_circle</i>
              Add to my list
            </a>,
            <a key="1" href="#" onClick={() => AnimesApi.removeAnimeFromList(this.props.value.id)}>
              <i className="material-icons">remove_circle</i>
              Remove from my list
            </a>
          ]}
          header={<CardTitle image={this.props.value.attributes.posterImage.small} />}
          horizontal
        >
          <h5><Link to={`/animes/${this.props.value.id}`}>{this.props.value.attributes.titles.en_jp}</Link></h5>
          <p>{this.props.value.attributes.synopsis}</p>
        </Card>
      </Row>

    )
  }
}

export default withRouter(Anime);