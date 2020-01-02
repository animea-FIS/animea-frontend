import React, { Component } from 'react';
import ProfilesApi from './ProfilesApi';
import M from "materialize-css";
import './Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faEnvelopeOpenText, faBirthdayCake, faMapMarkedAlt, faStarHalfAlt, faUserEdit } from '@fortawesome/free-solid-svg-icons'
import { Row, Col } from 'react-materialize';
import SHowProfile from './ShowProfile';
import EditProfile from './EditProfile';
import ShowProfile from './ShowProfile';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.showMyProfile = this.showMyProfile.bind(this);
        this.state = {
          errorInfo: null,
          profile: {},
          isEditing: {}
        }
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCloseError = this.handleCloseError.bind(this);
      }

    handleEdit(profile){
      this.setState(prevState => ({
        isEditing: {...prevState.isEditing, [profile.username]: profile}
      }));
    }  

    handleCloseError(){
      this.setState({
        errorInfo: null
      });
    }

    handleCancel(name, profile){
      this.setState(prevState => {
        const isEditing = Object.assign({}, prevState.isEditing);
        delete isEditing[name];
        return {
          isEditing: isEditing
        }
      });
      
    }

    handleChange(name, profile) {
      this.setState(prevState => ({
          isEditing: {...prevState.isEditing, [name]: profile}
      }))
    }
    
    handleSave(name, profile){

    }

    componentDidMount() {
      // Auto initialize all the things
      M.AutoInit();
      this.showMyProfile();
    }

    showMyProfile() { 
        var userId = "5df9cfb41c9d44000047b034"; //TODO Cambiar por ID del usuario autenticado
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
      return (
        <div>
          { ! this.state.isEditing[this.state.profile.username] ?
          <div>
              <ShowProfile key={this.state.profile.username} profile={this.state.profile} onEdit={this.handleEdit}/>
            </div>
            :
            <div>
              <EditProfile key={this.state.username} profile={this.state.isEditing[this.state.profile.username]} 
              onCancel={this.handleCancel.bind(this, this.state.profile.username)}
              onChange={this.handleChange.bind(this, this.state.profile.username)}
              onSave={this.handleSave.bind(this, this.state.profile.username)} />
            </div>
        }
        </div>
      )
    }
}

export default Profile;