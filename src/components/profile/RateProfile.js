import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

function RateProfile(props){
    return(
        <div className="container profile-center">
            <select value={props.ratingValue}>
                <option value="1">1 <FontAwesomeIcon icon={faStar}/></option>
                <option value="1">2 <FontAwesomeIcon icon={faStar}/></option>
                <option value="1">3 <FontAwesomeIcon icon={faStar}/></option>
                <option value="1">4 <FontAwesomeIcon icon={faStar}/></option>
                <option value="1">5 <FontAwesomeIcon icon={faStar}/></option>
            </select>
            <button className="btn btn-primary" onClick={() => props.onSave(props.profile)}>Rate</button>
                    <button className="btn btn-primary" onClick={() => props.onCancel(props.profile)}>Cancel</button>
        </div>
    )
}

export default RateProfile;