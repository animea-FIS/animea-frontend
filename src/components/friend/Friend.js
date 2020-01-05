import React, { Component } from 'react';
import FriendsApi from './FriendsApi';
import M from "materialize-css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faEnvelopeOpenText, faBirthdayCake, faMapMarkedAlt, faStarHalfAlt, faUserEdit } from '@fortawesome/free-solid-svg-icons'
import { Row, Col } from 'react-materialize';
import './Friend.css';

class Friend extends Component {
    componentDidMount() {
      // Auto initialize all the things
      M.AutoInit();
    }
    
    render(){
      return (
        <Row>
          <hr />
          <Row>
            <img src={this.props.value.profilePic} alt={this.props.value.username} className="circle tamano-img" /> <h4>{this.props.value.username}</h4>
          </Row>
          <h5>{this.props.value.name}</h5>
          <p><FontAwesomeIcon icon={faEnvelopeOpenText} /> {this.props.value.email} </p>
          {this.props.value.birthdate != null &&
            <p><FontAwesomeIcon icon={faBirthdayCake} /> {this.props.value.birthdate} - <FontAwesomeIcon icon={faMapMarkedAlt} /> {this.props.value.location}</p>
          }
          {this.props.value.birthdate == null &&
            <p><FontAwesomeIcon icon={faMapMarkedAlt} /> {this.props.value.location}</p>
          }
        </Row>
      )
    }
}

export default Friend;