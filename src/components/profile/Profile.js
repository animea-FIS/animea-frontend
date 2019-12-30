import React, { Component } from 'react';
import ProfilesApi from './ProfilesApi';
import M from "materialize-css";
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faEnvelopeOpenText, faBirthdayCake, faMapMarkedAlt, faStarHalfAlt, faUserEdit } from '@fortawesome/free-solid-svg-icons'
import { Row, Col } from 'react-materialize';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.showMyProfile = this.showMyProfile.bind(this);
        this.state = {
          profile: {}
        }
      }

    componentDidMount() {
      // Auto initialize all the things
      M.AutoInit();
      this.showMyProfile();
    }

    showMyProfile() { 
        var userId = "5df9cfb41c9d44000047b034"; //TODO Cambiar por ID del usuario autenticado
        ProfilesApi.getUserById(userId)
          .then(
            (result) => {
              console.log(result);
              this.setState({
                profile: result
              })
            },
            (error) => {
              console.log(error);
              this.setState({
                errorInfo: "Problem with connection to server"
              })
            }
          )
      }
    render(){
      let stars = [];
      for(let i=0; i< this.state.profile.rating; i++){
        stars.push(<FontAwesomeIcon icon={faStar}/>);
      console.log(this.state.profile.birthdate);
      }
      const video_url = (this.state.profile.presentationVideo + "").replace("watch?v=", "embed/");
      return (
        <Row>
          <Row>
            <img src={this.state.profile.profilePic} alt={this.state.profile.username} className="circle tamano-img" /> <h3>{this.state.profile.username}</h3>
          </Row>
          <h4>{this.state.profile.name}</h4>
          <p><FontAwesomeIcon icon={faEnvelopeOpenText} /> {this.state.profile.email}</p>
          {this.state.profile.birthdate != null &&
            <p><FontAwesomeIcon icon={faBirthdayCake} /> {this.state.profile.birthdate} - <FontAwesomeIcon icon={faMapMarkedAlt} /> {this.state.profile.location}</p>
          }
          {this.state.profile.birthdate == null &&
            <p><FontAwesomeIcon icon={faMapMarkedAlt} /> {this.state.profile.location}</p>
          }
          <p><FontAwesomeIcon icon={faStarHalfAlt} /> Rating: {this.state.profile.rating} {stars} </p>
          <p><FontAwesomeIcon icon={faUserEdit} /> Bio: {this.state.profile.bio}</p>
          <div className="video-container">
            <iframe src={video_url} frameBorder="0" allowFullScreen title={this.state.profile.username}></iframe>
          </div>

        </Row>
      )
    }
}

export default Profile;