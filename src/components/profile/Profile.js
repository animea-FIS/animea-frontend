import React, { Component } from 'react';
import ProfilesApi from './ProfilesApi';
import M from "materialize-css";
import './Profile.css';

class Profile extends Component{
    componentDidMount() {
        // Auto initialize all the things
        M.AutoInit();
    }
    render(){
        console.log('LOG:'+this.props.value);
        return(
            <div >
                <div >
                <h2>{this.props.value.name}</h2>
                <p>{this.props.value.username}</p>
                </div>
            </div>
        );
    }
}

export default Profile;