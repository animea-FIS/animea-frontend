import React, { Component } from 'react';
import {
    withRouter,
  } from "react-router-dom";
  import Profile from "./Profile";

function MyProfile(props){
    return(
        <Profile/>
    );
}


export default withRouter(MyProfile);