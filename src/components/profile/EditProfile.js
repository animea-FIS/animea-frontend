import React from 'react';

function EditProfile(props){
    const handelChange = event => {
        props.onChange({...props.profile, [event.target.name]: event.target.value})
    }
    return (
        <div> 
            <input className="form-control" name="username" readOnly value={props.profile.username} onChange={handelChange}/>
            <input className="form-control" name="name" value={props.profile.name} onChange={handelChange}/>
            <input className="form-control" name="email" value={props.profile.email} onChange={handelChange}/>
            <input className="form-control" name="location" value={props.profile.location} onChange={handelChange}/>
            <input className="form-control" name="birthdate" value={props.profile.birthdate} onChange={handelChange}/>
            <textarea className="form-control" name="bio" value={props.profile.bio} onChange={handelChange}/>
            <input className="form-control" name="profilePic" value={props.profile.profilePic} onChange={handelChange}/>
            <input className="form-control" name="presentationVideo" value={props.profile.presentationVideo} onChange={handelChange}/>
            
            <button className="btn btn-primary" onClick={() => props.onSave(props.profile)}>Save</button>
            <button className="btn btn-primary" onClick={() => props.onCancel(props.profile)}>Cancel</button>
        </div>
    )
}

export default EditProfile;