import React from 'react';
import { withRouter } from "react-router-dom";

class Error extends React.Component {
    render() {
        if (this.props.location.state && this.props.location.state.errorCode){
        return (
          <div className="container">
            <div class="row">
            <div class="col s12">
              <div class="card red darken-1">
                <div class="card-content white-text center-block">
                  <span class="card-title center"><h4>{this.props.location.state.errorCode} Error</h4></span>
                  <p class="center"><h4>{this.props.location.state.errorMessage}</h4></p>
                  <img src=""/>
                </div>
              </div>
            </div>
          </div>
          </div>
        );
        } else{
          return <div></div>
        }
    }
}

export default withRouter(Error); 