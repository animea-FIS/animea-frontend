import React, { Component } from 'react';
import AnimesApi from './AnimesApi';
import M from "materialize-css";
import './AnimeInfo.css';
import { Icon, CardTitle, Card, Row, Col } from 'react-materialize';
import {
    withRouter,
} from "react-router-dom";

class AnimeInfo extends Component {
    state = {
        animeInfo: {},
    };   

    constructor(props) {
        super(props);
        this.getAnimeById = this.getAnimeById.bind(this);
    }
    componentDidMount() {
        M.AutoInit();
    }

    componentWillMount() {
        this.getAnimeById(this.props.match.params.animeId);

    }

    getAnimeById(animeId) {
        AnimesApi.getAnimeById(animeId)
            .then(
                (result) => {
                    this.setState({
                        animeInfo: result[0]
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
        var animeInfo = this.state.animeInfo.attributes;
        if (animeInfo) {
            return (
                <div className="container">
                <div class="row" style={{marginTop:"2em"}}>
                    <div class="col s7">
                        <div class="card info-card">
                            <div class="card-image">
                                <img class="info-image" src={animeInfo.posterImage.large} />
                                <span class="card-title">{animeInfo.titles.en_jp}</span>
                            </div>
                            <div class="card-content">
                                <p>{animeInfo.synopsis}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col s5">
                    <div class="card pink lighten-2">
                        <div class="card-content white-text">
                        <span class="card-title">Relevant info</span>
                        <ul className="animeInfo">
                            <li><b>Start date: </b>{animeInfo.startDate}</li>
                            <li><b>End date: </b>{animeInfo.endDate}</li>
                            <li><b>Status: </b>{animeInfo.status}</li>
                            <li><b>Number of episodes: </b>{animeInfo.episodeCount}</li>
                            <li><b>Average length of episodes: </b>{animeInfo.episodeLength} minutes</li>
                            <li><b>Average rating: </b>{animeInfo.averageRating}/100 ★</li>
                        </ul>
                        </div>
                    </div>
                    <div class="card purple lighten-2">
                        <div class="card-content white-text">
                        <span class="card-title">Users that watched the anime...</span>
                        <ul className="animeInfo">
                            <li><b>C o r c h u</b></li>
                            <li><b>P a t r i</b></li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            )
        } else {
            return ("")
        }
    }
}

export default withRouter(AnimeInfo);