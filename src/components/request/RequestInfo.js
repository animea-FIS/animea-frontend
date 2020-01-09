import React, { Component } from 'react';
import RequestsApi from './RequestsApi';
import M from "materialize-css";
import './RequestInfo.css';
import { Icon, CardTitle, Card, Row, Col } from 'react-materialize';
import {
    withRouter,
} from "react-router-dom";
import { AuthContext } from "../auth/context/auth";

class RequestInfo extends Component {
    state = {
        requestInfo: {},
        user: {},
        friend: {}
    };

    constructor(props) {
        super(props);
        this.getRequestById = this.getRequestById.bind(this);
    }

    componentDidMount() {
        M.AutoInit();
    }

    componentWillMount() {
        this.getRequestById(this.props.match.params.requestId);
    }

    getRequestById(reqId) {
        RequestsApi.getRequestById(this.context.userId, reqId, this.context.token)
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

    render() {
        return (
            <div className="container">
                <br />
                Sender: {this.state.user.name} ({this.state.user.username}) <br />
                To: {this.state.friend.name} ({this.state.friend.username}) <br />
                Message: {this.state.requestInfo.message}
            </div>
        )
    }
}

RequestInfo.contextType = AuthContext;
export default withRouter(RequestInfo);