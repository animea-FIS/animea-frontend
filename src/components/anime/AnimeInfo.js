import React, { Component } from 'react';
import AnimesApi from './AnimesApi';
import M from "materialize-css";
import './AnimeInfo.css';
import { Icon, CardTitle, Card, Row, Col } from 'react-materialize';
import {
    withRouter,
} from "react-router-dom";
import { AuthContext } from "../auth/context/auth";
import {
    Link,
  } from "react-router-dom";
import Select from 'react-select';

class AnimeInfo extends Component {
    state = {
        animeInfo: {},
        userFriendsForAnime: false,
        usersForAnime: false
    };   

    constructor(props) {
        super(props);
        this.getAnimeById = this.getAnimeById.bind(this);
        this.getUserFriendsForAnime = this.getUserFriendsForAnime.bind(this);
        this.getUsersForAnime = this.getUsersForAnime.bind(this);
    }

    componentDidMount() {
        M.AutoInit();
    }

    componentWillMount() {
        this.getAnimeById(this.props.match.params.animeId, this.context.authTokens);
        if(this.context.authTokens){
            this.getUserFriendsForAnime(this.props.match.params.animeId);
            this.getUsersForAnime(this.props.match.params.animeId);
        }

    }

    getAnimeById(animeId) {
        AnimesApi.getAnimeById(animeId, this.context.authTokens)
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

    addAnime(animeId){
        AnimesApi.addAnimeToUserList(animeId, this.context.userId, this.context.authTokens).then(
          (result) => {
            this.getAnimeById(animeId);
          },
          (error) => {
            this.setState(
              {error}
            );          
          }
        );
      }
    
      removeAnime(animeId){
        AnimesApi.removeAnimeFromList(animeId, this.context.userId, this.context.authTokens).then(
          (result) => {
            this.getAnimeById(animeId);
          },
          (error) => {
            this.setState(
              {error}
            );          
          }
        );
      }

      updateStatus(animeId, e) {
        const anime = {
          anime_id: animeId,
          status: e.value
        }
        
        AnimesApi.updateAnimeFromList(anime, this.context.userId, this.context.authTokens).then(
          (result) => {
            this.getAnimeById(animeId);
          },
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
          rating: e.value
        }
        
        AnimesApi.updateAnimeFromList(anime, this.context.userId, this.context.authTokens).then(
          (result) => {
            this.getAnimeById(animeId);
          },
          (error) => {
            console.log(error)
            this.setState(
              {error}
            );          
          }
        );
      }
      

    async getUserFriendsForAnime(animeId) {
        AnimesApi.getUserFriendsForAnime(animeId, this.context.userId, this.context.authTokens)
            .then(
                (result) => {
                    this.setState({
                        userFriendsForAnime: result
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

    async getUsersForAnime(animeId) {
      AnimesApi.getUsersForAnime(animeId, this.context.authTokens)
          .then(
              (result) => {
                  this.setState({
                      usersForAnime: result
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
        var animeInfo;
        if(this.props.testAnime){
          animeInfo = this.props.testAnime.attributes;
        }else{
          animeInfo = this.state.animeInfo.attributes;
      }
        var friends = "";
        var users = "";
        var addButtom = "";
        var removeButtom = "";
        var updateRatingAnime = "";
        var updateStatusAnime = "";
        const ratingOptions = [
            { value: '1', label: '1' },
            { value: '2', label: '2' },
            { value: '3', label: '3' },
            { value: '4', label: '4' },
            { value: '5', label: '5' },
        ];
        const statusOptions = [
            { value: 'pending', label: 'Pending' },
            { value: 'watching', label: 'Watching' },
            { value: 'finished', label: 'Finished' },
        ];
        var selectedOption = this.state.animeInfo.rating
        if(this.state.userFriendsForAnime) {
            const listItems = this.state.userFriendsForAnime.map((friendObj) =>
                <div class="chip">
                    <img src={friendObj.profilePic} alt="Contact Person" />
                    <Link to={`profile/${friendObj.id}`}><b>{friendObj.username}</b></Link>
                </div>
                )
            
        if(listItems.length > 0){
            friends = (<div class="card purple lighten-2">
            <div class="card-content white-text">
            <span class="card-title">Friends that watched the anime...</span>
            <ul className="animeInfo">
                {listItems}
            </ul>
            </div>
        </div>)
            }
        }

        if(this.state.usersForAnime) {
          const usersList = this.state.usersForAnime.map((friendObj) =>
              <div class="chip">
                  <img src={friendObj.profilePic} alt="Contact Person" />
                  <Link to={`/profile/${friendObj.id}`}><b>{friendObj.username}</b></Link>
              </div>
              )
          
      if(usersList.length > 0){
          users = (<div class="card purple lighten-2">
          <div class="card-content white-text">
          <span class="card-title">Users that watched the anime...</span>
          <ul className="animeInfo">
              {usersList}
          </ul>
          </div>
      </div>)
          }
      }
        if(!this.state.animeInfo.userHasAnime) {
            addButtom = (<a key="1" href="#" id="addAnime" onClick={() => this.addAnime(this.state.animeInfo.id)} >
                        <i className="material-icons">add_circle</i>
                        Add to my list
                        </a>
            )
        }
        if(this.state.animeInfo.userHasAnime) {
            removeButtom = (<a key="1" href="#" id="deleteAnime" onClick={() => this.removeAnime(this.state.animeInfo.id)}>
                        <i className="material-icons">remove_circle</i>
                        Remove from my list
                    </a>
            )
        }
        if(this.state.animeInfo.userHasAnime) {
            updateRatingAnime = (<Select
                placeholder={selectedOption}
                value={selectedOption}
                onChange={(e) => this.updateRating(this.state.animeInfo.id, e)}
                options={ratingOptions}
                theme={theme => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      primary25: 'hotpink',
                      primary: 'hotpink',
                    },
                  })}/>
            )
        }
        if(this.state.animeInfo.userHasAnime) {
            updateStatusAnime = (<Select
                placeholder={this.state.animeInfo.status}
                value={selectedOption}
                onChange={(e) => this.updateStatus(this.state.animeInfo.id, e)}
                options={statusOptions}
                theme={theme => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      primary25: 'hotpink',
                      primary: 'hotpink',
                    },
                  })}/>
            )
        }

        if (animeInfo) { 
            return (
            <div className="container">
                <div class="row" style={{marginTop:"2em"}}>
                    <div class="col s7">
                        <div class="card info-card">
                            <div class="card-image">
                                <img class="info-image" src={animeInfo.posterImage.large} style={{objectFit: "cover"}}/>
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
                    {friends}
                    {users}
                    </div>
                    <div class="col s5">
                        <div class="card pink lighten-2">
                            <div class="card-content white-text">
                                <span class="card-title">My anime info</span>
                                <ul className="animeInfo">
                                    {this.state.animeInfo.status ? <li><b>My rating: </b>{this.state.animeInfo.rating} ★</li> : ''}
                                    {this.state.animeInfo.status ? <li><b>My status: </b>{this.state.animeInfo.status} ★</li> : ''}
                                </ul>
                            </div>
                        </div>
                    </div>
                    {addButtom}
                    {removeButtom}
                    <div>
                        {updateRatingAnime}
                        {updateStatusAnime}
                    </div>
                </div>
            </div>
            )
        } else {
            return ("")
        }
    }
}

AnimeInfo.contextType = AuthContext;
export default withRouter(AnimeInfo);