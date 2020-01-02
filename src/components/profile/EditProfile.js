import React from 'react';

function EditProfile(props){
    const handelChange = event => {
        props.onChange({...props.profile, [event.target.name]: event.target.value})
    }
    return (
        <div>
            <input className="form-control" name="username" value={props.profile.username} onChange={handelChange}/>
            <input className="form-control" name="name" value={props.profile.name} onChange={handelChange}/>
            
            <button className="btn btn-primary" onClick={() => props.onSave(props.profile)}>Save</button>
            <button className="btn btn-primary" onClick={() => props.onCancel(props.profile)}>Cancel</button>
        </div>
    )
}

export default EditProfile;