import React, { Component } from 'react';
import ProfilesApi from './ProfilesApi';
import M from "materialize-css";
import './Profile.css';

class Profile extends Component {
    
    state = {
        profile: {
            name: "Antonio",
            surname: "Rodriguez"
          }
      };

    constructor(props) {
        super(props);
        this.showMyProfile = this.showMyProfile.bind(this);
      }

    componentDidMount() {
      // Auto initialize all the things
      M.AutoInit();
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
        const profile = {
            name: "Paco",
            surname: "Perez"
        }
        return(
            <p>{this.state.profile.name}</p>
        )
    }
}

export default Profile;