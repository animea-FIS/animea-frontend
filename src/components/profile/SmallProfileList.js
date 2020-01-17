import React, { Component } from 'react';
import ProfilesApi from './ProfilesApi';
import M from "materialize-css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faEnvelopeOpenText, faBirthdayCake, faMapMarkedAlt, faStarHalfAlt, faUserEdit } from '@fortawesome/free-solid-svg-icons'
import { Row, Col } from 'react-materialize';
import './Profile.css';

class SmallProfileList extends Component {
    componentDidMount() {
        // Auto initialize all the things
        M.AutoInit();
    }

    render(){
        const user_profile_url = `/profile/${this.props.user.id}`
        return (
          <Row className="profile-center">
            <hr />
            <Row >
            <a href={user_profile_url} ><img src={this.props.user.profilePic} alt={this.props.user.username} className="circle tamano-img" /> <h4 >{this.props.user.username}</h4></a>
            </Row>
            <h5>{this.props.user.name}</h5>
            <p><FontAwesomeIcon icon={faEnvelopeOpenText} /> {this.props.user.email} </p>
            {this.props.user.location != null &&
              <p><FontAwesomeIcon icon={faMapMarkedAlt} /> {this.props.user.location}</p>
            }
          </Row>
        )
      }
}

export default SmallProfileList;