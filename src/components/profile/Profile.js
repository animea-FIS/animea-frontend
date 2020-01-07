import React, { Component } from 'react';
import ProfilesApi from './ProfilesApi';
import M from "materialize-css";
import './Profile.css';
import EditProfile from './EditProfile';
import ShowProfile from './ShowProfile';
import Alert from './Alert';
import {AuthContext} from "../auth/context/auth";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.showMyProfile = this.showMyProfile.bind(this);
        this.state = {
          errorInfo: null,
          profile: {},
          isEditing: {},
          rating: 0,
          alreadyRated: false,
          alreadyRatedValue: 0,
          lastTweet:null,
          formErrors: {email: '', profilePic: ''},
          emailValid: false,
          profilePicValid: false,
          formValid: true
        }
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCloseError = this.handleCloseError.bind(this);
        this.updateRate = this.updateRate.bind(this);
        this.updateRecentlyRate = this.updateRecentlyRate.bind(this);
        this.didUserAlreadyRate = this.didUserAlreadyRate.bind(this);
        this.getUserLastTweet = this.getUserLastTweet.bind(this);
    }

    getUserLastTweet(twitterUsername){
      if(!twitterUsername || twitterUsername ==='' ){
        this.setState({
          errorInfo: null,
          lastTweet: "You must add a Twitter account in order to show your last tweet here."
        })
      }else{
        ProfilesApi.getLastTweet(twitterUsername).then((result) => {
          console.log(result);
          this.setState({
            lastTweet: result.lastTweet
          })
        }, (error) => {
          this.setState({
            lastTweet: "Last tweet not found, check your Twitter username."
          })
        })
      }
    }

    updateRecentlyRate(value){
      const ratings = this.state.profile.ratings;
      let totalRatingValue = value;
      for(let i = 0; i < ratings.length; i++){
        totalRatingValue = totalRatingValue + ratings[i].value;
      }
      this.setState({
        alreadyRated: true,
        alreadyRatedValue: value,
        rating: totalRatingValue
      })
    }

    updateRate(){
      ProfilesApi.getRatingByUserId(this.state.profile.id).then((result) => {
          this.setState({
            rating: result.rating
          })
          this.didUserAlreadyRate();
        },
        (error) => {
          this.setState({
            errorInfo: "Problem retrieving the new rate"
          })
        }
      )
    }

    didUserAlreadyRate(){
      const ratings = this.state.profile.ratings;
      let alreadyRated = false;
      let alreadyRatedValue = 0;
      
      for(let i= 0; i<ratings.length; i++){
        if(ratings[i].rater_user_id === "5df9cfb41c9d44000047b038"){
          alreadyRated = true;
          alreadyRatedValue = ratings[i].value;
          break;
        }
      }

      if(alreadyRated){
        this.setState({
          alreadyRated: true,
          alreadyRatedValue: alreadyRatedValue
        })
      }
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
          isEditing: isEditing,
        }
      });    
    }

    handleChange(name, profile) {
      const email = profile.email;
      const profilePic = profile.profilePic;
      this.setState(prevState => ({
          isEditing: {...prevState.isEditing, [name]: profile}
      }));
      this.validateEmail(email);
      this.validateProfilePic(profilePic);
    }

    validateEmail(email){
      let fieldValidationErrors = this.state.formErrors;
      let emailValid = email + "";
      emailValid = emailValid.includes("@");

      if(emailValid){
        fieldValidationErrors.email = "";
      }else{
        fieldValidationErrors.email = " is invalid, must have an @"
      }

      this.setState({
        formErrors: fieldValidationErrors,
        emailValid: emailValid
      }); 
      this.validateForm();
    }

    validateProfilePic(profilePic){
      let fieldValidationErrors = this.state.formErrors;
      let profilePicValid = profilePic + "";
      profilePicValid = profilePicValid.match(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/);

      if(profilePicValid){
        fieldValidationErrors.profilePic = "";
      }else{
        fieldValidationErrors.profilePic = " is invalid, must be a valid picture url";
      }

      this.setState({
        formErrors: fieldValidationErrors,
        profilePicValid: profilePicValid
      }); 
      this.validateForm();
    }

    validateForm(){
      this.setState({
        formValid: this.state.emailValid && this.state.profilePicValid
      });
      console.log(this.state.formValid);
    }
    
    handleSave(name, profile){
      this.setState(prevState => {
        const isEditing = Object.assign({}, prevState.isEditing);
        delete isEditing[name];
        if(name === profile.username){
          this.saveProfile(profile);
          this.getUserLastTweet(profile.twitterUsername);
          return {
            profile: profile,
            isEditing: isEditing
          }
        }
        return{
          errorInfo: "Cannot edit username"
        }
      })
    }

    componentDidMount() {
      // Auto initialize all the things
      M.AutoInit();
      this.showMyProfile();
    }

    showMyProfile() { 
        var userId = "5e145b225591df48f0316f03"; //TODO Cambiar por ID del usuario autenticado
        ProfilesApi.getUserById(userId)
          .then(
            (result) => {
              this.setState({
                profile: result
              });
              this.updateRate();
              this.getUserLastTweet(result.twitterUsername);
            },
            (error) => {
              console.log(error);
              this.setState({
                errorInfo: "Problem with connection to server"
              })
            }
          );
          
      }

      saveProfile(profile){
        ProfilesApi.updateProfile(profile).then((result => {
            this.setState({
              errorInfo: null
            })
          }, (error) => {
            console.log(error);
          })
        )
      }
    render(){
      return (
        <div>
          <p>{this.context.userId}</p>
          <div>
            <Alert message={this.state.errorInfo} onClose={this.handleCloseError} />
          </div>
          {!this.state.isEditing[this.state.profile.username] ?
            <div>
              <ShowProfile key={this.state.profile.username} profile={this.state.profile}
              rating={this.state.rating} lastTweet={this.state.lastTweet} updateRecentlyRate={this.updateRecentlyRate} alreadyRated={this.state.alreadyRated}
              alreadyRatedValue={this.state.alreadyRatedValue}
                onEdit={this.handleEdit} />
            </div>
            :
            <div>
              <EditProfile key={this.state.username} profile={this.state.isEditing[this.state.profile.username]}
                onCancel={this.handleCancel.bind(this, this.state.profile.username)}
                onChange={this.handleChange.bind(this, this.state.profile.username)}
                onSave={this.handleSave.bind(this, this.state.profile.username)} 
                isValid={this.state.formValid}
                formErrors={this.state.formErrors}/>
            </div>
          }
        </div>
      )
    }
}

Profile.contextType = AuthContext;
export default Profile;