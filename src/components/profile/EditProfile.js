import React from 'react';
import './Profile.css';

function EditProfile(props){
    const handleChange = event => {
        props.onChange({...props.profile, [event.target.name]: event.target.value})
    }
    return (
        
                <div className="container profile-center">
                    <h3>{props.profile.username}</h3>
                    <input type="hidden" name="username" readOnly value={props.profile.username} onChange={handleChange} />
                    <label> Name:
            <input className="form-control" name="name" value={props.profile.name} onChange={handleChange} />
                    </label>
                    <label> Email:
            <input className="form-control" name="email" value={props.profile.email} onChange={handleChange} />
                    </label>
                    <label> Location:
            <input className="form-control" name="location" value={props.profile.location} onChange={handleChange} />
                    </label>
                    <label> Birthdate:
            <input className="form-control" name="birthdate" value={props.profile.birthdate} onChange={handleChange} />
                    </label>
                    <label> Bio:
            <textarea className="form-control" name="bio" value={props.profile.bio} onChange={handleChange} />
                    </label>
                    <label> Profile picture:
            <input className="form-control" name="profilePic" value={props.profile.profilePic} onChange={handleChange} />
                    </label>
                    <label> Presentation video:
            <input className="form-control" name="presentationVideo" value={props.profile.presentationVideo} onChange={handleChange} />
                    </label>

                    <button className="btn btn-primary" onClick={() => props.onSave(props.profile)}>Save</button>
                    <button className="btn btn-primary" onClick={() => props.onCancel(props.profile)}>Cancel</button>
                </div>
            
    )
}

export default EditProfile;