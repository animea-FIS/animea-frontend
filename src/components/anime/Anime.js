import React, { Component } from 'react';
import AnimesApi from './AnimesApi';
import M from "materialize-css";
import './Anime.css';


class Anime extends Component {

  componentDidMount() {
    // Auto initialize all the things
    M.AutoInit();
  }

  render() {
    console.log(this.props.value.attributes)
    var coverImage = "https://d13ezvd6yrslxm.cloudfront.net/wp/wp-content/images/mandalorian-babyyoda-plush-frontpage-700x311.jpg"
    if (this.props.value.attributes.coverImage) {
      coverImage = this.props.value.attributes.coverImage.small
    }
    return (
      <div className="col s12 m7">
        <div className="card horizontal">
          <div className="card-image">
            <img src={this.props.value.attributes.posterImage.small} />
          </div>
          <div className="card-stacked">
            <div className="card-content">
              <h5>{this.props.value.attributes.titles.en_jp}</h5>
              <p>{this.props.value.attributes.synopsis}</p>
            </div>
            <div className="card-action">
              <a href="#">Add to my list</a>
              <a href="#">Another cool option</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Anime;