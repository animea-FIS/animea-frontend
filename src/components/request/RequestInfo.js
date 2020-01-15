import React, { Component } from 'react';
import RequestsApi from './RequestsApi';
import M from "materialize-css";
import './RequestInfo.css';
import { Icon, CardTitle, Card, Row, Col } from 'react-materialize';
import {
    withRouter, Redirect
} from "react-router-dom";
import { AuthContext } from "../auth/context/auth";

class RequestInfo extends Component {
    state = {
        requestInfo: {},
        user: {},
        friend: {},
        done: false
    };

    constructor(props) {
        super(props);
        this.getRequestById = this.getRequestById.bind(this);
        this.acceptRequest = this.acceptRequest.bind(this);
        this.removeRequest = this.removeRequest.bind(this);
    }

    componentDidMount() {
        M.AutoInit();
    }

    componentWillMount() {
        this.getRequestById(this.props.match.params.requestId);
    }

    getRequestById(reqId) {
        RequestsApi.getRequestById(this.context.userId, reqId, this.context.authTokens)
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        requestInfo: result,
                        user: result.user,
                        friend: result.friend
                    });
                },
                (error) => {
                    console.log(error)
                    this.setState({
                        errorInfo: "Problem with connection to server"
                    });
                }
            );
    };

    acceptRequest(reqId) {
        RequestsApi.acceptRequest(this.context.userId, reqId, this.context.authTokens).then(
          () => {
            this.setState({
                done: true
            });
          },
          (error) => {
            console.log(error);
            this.setState({
              errorInfo: "Connection problem"
            })
          }
        )
      }

    removeRequest(reqId) {
        RequestsApi.removeRequest(this.context.userId, reqId, this.context.authTokens).then(
          () => {
            this.setState({
                done: true
            });
          },
          (error) => {
            console.log(error);
            this.setState({
              errorInfo: "Connection problem"
            })
          }
        )
      }

    render() {
        if (this.state.done) return <Redirect to="/requests" />

        return (
            <div className="container">
                <br />
                Sender: {this.state.user.name} ({this.state.user.username}) <br />
                To: {this.state.friend.name} ({this.state.friend.username}) <br />
                Message: {this.state.requestInfo.message} <br />
                {this.context.userId === this.state.friend.id &&
                <a key="1" href="#" onClick={() => this.acceptRequest(this.state.requestInfo.id)}>
                    <i className="material-icons">add_circle</i>
                    Accept request
                </a>
                }
                {this.context.userId === this.state.user.id &&
                <a key="1" href={`/requests/edit/${this.state.requestInfo.id}`}>
                    <i className="material-icons">add_circle</i>
                    Edit request
                </a>
                }
                <a key="1" href="#" onClick={() => this.removeRequest(this.state.requestInfo.id)}>
                <i className="material-icons">remove_circle</i>
                    Remove request
        </a>
            </div>
        )
    }
}

RequestInfo.contextType = AuthContext;
export default withRouter(RequestInfo);