import React from 'react';
import { Row, Col } from 'react-materialize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faEnvelopeOpenText, faBirthdayCake, faMapMarkedAlt, faStarHalfAlt, faUserEdit } from '@fortawesome/free-solid-svg-icons'

function ShowProfile(props){
    let stars = [];
      for(let i=0; i< props.profile.rating; i++){
        stars.push(<FontAwesomeIcon icon={faStar}/>);
      }
    const video_url = (props.profile.presentationVideo + "").replace("watch?v=", "embed/");
    return(
        <Row>
          <Row>
            <img src={props.profile.profilePic} alt={props.profile.username} className="circle tamano-img" /> <h3>{props.profile.username}</h3>
          </Row>
          <h4>{props.profile.name}</h4>
          <p><FontAwesomeIcon icon={faEnvelopeOpenText} /> {props.profile.email}</p>
          {props.profile.birthdate != null &&
            <p><FontAwesomeIcon icon={faBirthdayCake} /> {props.profile.birthdate} - <FontAwesomeIcon icon={faMapMarkedAlt} /> {props.profile.location}</p>
          }
          {props.profile.birthdate == null &&
            <p><FontAwesomeIcon icon={faMapMarkedAlt} /> {props.profile.location}</p>
          }
          <p><FontAwesomeIcon icon={faStarHalfAlt} /> Rating: {props.profile.rating} {stars} </p>
          <p><FontAwesomeIcon icon={faUserEdit} /> Bio: {props.profile.bio}</p>
          <div className="video-container">
            <iframe src={video_url} frameBorder="0" allowFullScreen title={props.profile.username}></iframe>
          </div>
          <Row>
            <button className="btn btn-primary" onClick={() => props.onEdit(props.profile)}>Edit</button>
          </Row>
        </Row>
    );
}

export default ShowProfile;