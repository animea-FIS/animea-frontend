import React, { Component } from 'react';
import AnimesApi from './AnimesApi';
import M from "materialize-css";
import './Anime.css';
import { Icon, CardTitle, Card, Row, Col } from 'react-materialize';

class Anime extends Component {

  componentDidMount() {
    // Auto initialize all the things
    M.AutoInit();
  }

  render() {
    // console.log(this.props.value.attributes)
    return (
    <Row>
        <Card
          actions={[
            <a key="1" href="#">
              <i class="material-icons">add_circle</i>
              Add to my list 
              </a>
          ]}
          header={<CardTitle image={this.props.value.attributes.posterImage.small} />}
          horizontal
        >
          <h5>{this.props.value.attributes.titles.en_jp}</h5>
          <p>{this.props.value.attributes.synopsis}</p>
    </Card>
    </Row>
    )
  }
}

export default Anime;