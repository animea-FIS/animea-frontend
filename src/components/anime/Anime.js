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

  constructor(props) {
    super(props);

    this.state = {
      rating: '1'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Your rate: ' + this.state.value);
  }

  state = {
    isInEditMode: false,
    //value: 'coconout'
  }

  changeEditMode() {
    this.setState({
      isInEditMode: !this.state.isInEditMode
    });
    console.log(this.state.isInEditMode)
  }
  

  editView() {
    console.log(this.state.rating)
    const options = [
      { value: '1', label: '1' },
      { value: '2', label: '2' },
      { value: '3', label: '3' },
      { value: '4', label: '4' },
      { value: '5', label: '5' }
    ]
    return <form onSubmit={this.handleSubmit}>
        <label>
          Rate this anime:
          <Select value={this.state.value} options={options}/>
        </label>
        <input type="submit" value="Submit" />
      </form>
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
            <a key="1" href="#" onClick={() => AnimesApi.updateAnimeFromList(this.props.value.id)} >
              <i className="material-icons">edit</i>
              Edit
            </a>,
            <a key="1" href="#" onClick={() => this.changeEditMode()} >
              <i className="material-icons">edit</i>
              Edit with form
            </a>
          ]}
          header={<CardTitle image={this.props.value.attributes.posterImage.small} />}
          horizontal
        >
          <h5><Link to={`/animes/${this.props.value.id}`}>{this.props.value.attributes.titles.en_jp}</Link></h5>
          <p>{this.props.value.attributes.synopsis}</p>
          
          {this.state.isInEditMode ? this.editView() : null}
          
        </Card>
      </Row>

    )
  }
}

export default withRouter(Anime);