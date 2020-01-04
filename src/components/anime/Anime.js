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

  updateStatus(animeId, e) {

    const anime = {
      anime_id: animeId,
      status: e
    }
    
    AnimesApi.updateAnimeFromList(anime);
  }

  updateRating(animeId, e) {

    const anime = {
      anime_id: animeId,
      rating: e
    }
    
    AnimesApi.updateAnimeFromList(anime);
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

          <div class="col s3" style={{padding: 30}}>
            <select id="statusSelected" class="input-field" onChange={(e) => this.updateStatus(this.props.value.id, e.target.value)}>
              <option value="pending">Pending</option>
              <option value="watching">Watching</option>   
              <option value="finished">Finished</option>                      
            </select>
          </div>
          <div class="col s3" style={{padding: 30}}>
            <select id="ratingSelected" class="input-field" onChange={(e) => this.updateRating(this.props.value.id, e.target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>   
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>                   
            </select>
          </div>
        </Card>
      </Row>

    )
  }
}

export default withRouter(Anime);