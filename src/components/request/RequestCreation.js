import React, { Component } from 'react';
import M from 'materialize-css';

import RequestsApi from './RequestsApi';
import { AuthContext } from "../auth/context/auth";
import {
    withRouter, Redirect
} from "react-router-dom";

class RequestCreation extends Component {
    state = {
        message: "",
        prevReq: null,
        done: false
    }

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.createRequest = this.createRequest.bind(this);
    }

    componentDidMount() {
        M.AutoInit();
        if (this.props.match.params.reqId) {
            RequestsApi.getRequestById(this.context.userId, this.props.match.params.reqId, this.context.token)
                .then(
                    (result) => {
                        console.log(result.message);
                        this.setState({
                            prevReq: result,
                            message: result.message
                        });
                    },
                    (error) => {
                        console.log(error)
                        this.setState({
                            errorInfo: "Problem with connection to server."
                        })
                    }
                );
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.name.includes("ing_") ? target : target.value;
        const name = target.name;
    
        this.setState({
            [name]: value
        });
    }

    createRequest(message) {
        if (this.props.match.params.friendId) {
            RequestsApi.createRequest(this.context.userId, this.props.match.params.friendId, message, this.context.token)
                .then(
                    (result) => {
                        console.log(result);
                        this.setState({
                            done: true
                        });
                    },
                    (error) => {
                        console.log(error)
                        this.setState({
                            errorInfo: "Problem with connection to server."
                        })
                    }
                );
        } else if (this.props.match.params.reqId) {
            RequestsApi.updateRequest(this.state.prevReq, message, this.context.token)
                .then(
                    (result) => {
                        console.log(result);
                        this.setState({
                            done: true
                        });
                    },
                    (error) => {
                        console.log(error)
                        this.setState({
                            errorInfo: "Problem with connection to server."
                        })
                    }
                );
        }
    }

    render() {
        if (this.state.done) return <Redirect to="/requests" />

        var userToken = this.context.authTokens;

        return(
            <div>
                <div class="col s3" style={{fontWeigth: 'bold', fontFamily: 'Belgrano', padding: 30, paddingLeft: 80}}>
                    <h4><p>Create a new request:</p></h4>
                </div>
                <div class="row" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <form class="col s10" style={{margin: 0}} onSubmit={(e) => {this.createRequest(this.state.message); e.preventDefault();}}>
                        <div class="row">
                            <div class="input-field col s12">
                                <h6>Type your message</h6>
                                <textarea id="message" name="message" class="materialize-textarea validate" data-length="500" value={this.state.message} required onChange={this.handleInputChange}/>
                            </div>
                        </div>
                        <div class="row" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <button class="btn waves-effect waves-light" type="submit" name="action" style={{backgroundColor: '#ffd54f', color: 'black'}}>
                                Submit
                                <i class="material-icons right">send</i>
                            </button>
                        </div> 
                    </form>
                </div>      
            </div>
        )
    }
}

RequestCreation.contextType = AuthContext;
export default withRouter(RequestCreation); 