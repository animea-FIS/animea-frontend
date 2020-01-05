import React, { Component } from 'react';
import M from "materialize-css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faEnvelopeOpenText, faBirthdayCake, faMapMarkedAlt, faStarHalfAlt, faUserEdit } from '@fortawesome/free-solid-svg-icons'
import { Row, Col } from 'react-materialize';
import './Request.css';

class Request extends Component {
    componentDidMount() {
      // Auto initialize all the things
      M.AutoInit();
    }
    
    render(){
      var url = 'requests/' + this.props.value.id
      return (
        <Row>
          <hr />
          <a href={url}>{this.props.value.userId}</a>
        </Row>
      )
    }
}

export default Request;