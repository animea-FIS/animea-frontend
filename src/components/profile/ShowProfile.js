import React from 'react';
import { Row } from 'react-materialize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faEnvelopeOpenText, faBirthdayCake, faMapMarkedAlt, faStarHalfAlt, faUserEdit } from '@fortawesome/free-solid-svg-icons'
import ProfileVideo from './ProfileVideo';
import './Profile.css';

function ShowProfile(props){
    let stars = [];
      for(let i=0; i< props.profile.rating; i++){
        stars.push(<FontAwesomeIcon icon={faStar}/>);
      }
    let video_url = (props.profile.presentationVideo + "");
  return (
    <div className="container profile-center">
    <Row>
      <Row>
        <div>
          <img src={props.profile.profilePic} alt={props.profile.username} className="circle tamano-img" /> <h3>{props.profile.username}</h3>
        </div>
      </Row>
      <div>
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
      </div>
      <Row>
        <div>
          <button className="btn btn-primary" onClick={() => props.onEdit(props.profile)}>Edit</button>
        </div>
        <div>
          <button className="btn btn-primary" onClick={() => props.onRate(props.profile)}>Rate user</button>
        </div>
      </Row>
      <div>
      <ProfileVideo presentationVideo={video_url} />
      </div>
    </Row>
    </div>
  );
}

export default ShowProfile;