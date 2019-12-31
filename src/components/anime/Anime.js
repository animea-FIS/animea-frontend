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
import Select from 'react-select';

class Anime extends Component {  
  componentDidMount() {
    // Auto initialize all the things
    M.AutoInit();
  }

  state = {
    ratingIsEditable: false,
    statusIsEditable: false,
  }

  changeEditModeRating() {
    this.setState({
      ratingIsEditable: !this.state.ratingIsEditable
    });
  }

  changeEditModeStatus() {
    this.setState({
      statusIsEditable: !this.state.statusIsEditable
    });
  }
  
  updateRating(animeId, rating) {
    const anime = {
      anime_id: animeId,
      rating: rating
    }

    AnimesApi.updateAnimeFromList(anime);
  }

  updateStatus(animeId, status) {
    const anime = {
      anime_id: animeId,
      status: status
    }

    AnimesApi.updateAnimeFromList(anime);
  }

  editRating(animeId) {

    const { selectedOption } = this.state;
    
    const options = [
      { value: '1', label: '1' },
      { value: '2', label: '2' },
      { value: '3', label: '3' },
      { value: '4', label: '4' },
      { value: '5', label: '5' }
    ]
    return <Select value={selectedOption} onChange={(e) => this.updateRating(animeId, e.value)} options={options}/>
  }

  editStatus(animeId) {

    const { selectedOption } = this.state;
    
    const options = [
      { value: 'pending', label: 'Pending' },
      { value: 'watching', label: 'Watching' },
      { value: 'finished', label: 'Finished' }
    ]
    return <Select value={selectedOption} onChange={(e) => this.updateStatus(animeId, e.value)} options={options}/>
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
            </a>,
            <a key="1" href="#" onClick={() => this.changeEditModeRating()} >
              <i className="material-icons">edit</i>
              Edit rating
            </a>,
            <a key="1" href="#" onClick={() => this.changeEditModeStatus()} >
              <i className="material-icons">edit</i>
              Edit status
          </a>
          ]}
          header={<CardTitle image={this.props.value.attributes.posterImage.small} />}
          horizontal
        >
          <h5><Link to={`/animes/${this.props.value.id}`}>{this.props.value.attributes.titles.en_jp}</Link></h5>
          <p>{this.props.value.attributes.synopsis}</p>
          
          {this.state.ratingIsEditable ? this.editRating(this.props.value.id) : null}
          {this.state.statusIsEditable ? this.editStatus(this.props.value.id) : null}
          
        </Card>
      </Row>

    )
  }
}

export default withRouter(Anime);