import React from 'react';
import { withRouter } from "react-router-dom";

class Error extends React.Component {
    render() {
      var errorCode;
      var errorMsg;
        if (this.props.location.state && this.props.location.state.errorCode){
          errorCode = this.props.location.state 
          errorMsg = this.props.location.state.errorCode
        } else {
          errorCode = 500
          errorMsg = 'Something went wrong'
        }
       return (
          <div className="container">
            <div class="row">
            <div class="col s12">
              <div class="card red darken-1">
                <div class="card-content white-text center-block">
                  <span class="card-title center"><h4>{errorCode} Error</h4></span>
                  <p class="center"><h4>{errorMsg}</h4></p>
                  <img src=""/>
                </div>
              </div>
            </div>
          </div>
          </div>
        );
    }
}

export default withRouter(Error); 