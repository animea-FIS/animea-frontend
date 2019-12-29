import React, { Component } from 'react';
import ProfilesApi from './ProfilesApi';
import M from "materialize-css";
import './Profile.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.showMyProfile = this.showMyProfile.bind(this);
        this.state = {
          profile: {}
        }
      }

    componentDidMount() {
      // Auto initialize all the things
      M.AutoInit();
      this.showMyProfile();
    }

    showMyProfile() { 
        var userId = 1; //TODO Cambiar por ID del usuario autenticado
        ProfilesApi.getUserById(userId)
          .then(
            (result) => {
              console.log(result);
              this.setState({
                profile: result
              })
            },
            (error) => {
              console.log(error);
              this.setState({
                errorInfo: "Problem with connection to server"
              })
            }
          )
      }
    render(){
        return(
            <div>
                <h3>{this.state.profile.username}</h3>
                <h4>{this.state.profile.name}</h4>
                <p>{this.state.profile.email}</p>
                  {this.state.profile.birthdate != null &&
                    <p>{this.state.profile.birthdate} - {this.state.profile.location}</p>
                  }
                   {this.state.profile.birthdate == null &&
                    <p>{this.state.profile.location}</p>
                  }
                <p>Rating: {this.state.profile.rating}</p>
                <p>Bio: {this.state.profile.bio}</p>
            </div>
        )
    }
}

export default Profile;