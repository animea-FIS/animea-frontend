import React, { Component } from 'react';
import RequestsApi from './RequestsApi';
import M from "materialize-css";
import './RequestInfo.css';
import { Icon, CardTitle, Card, Row, Col } from 'react-materialize';
import {
    withRouter,
} from "react-router-dom";

class RequestInfo extends Component {
    state = {
        requestInfo: {},
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
        RequestsApi.getRequestById('5df9cfb41c9d44000047b035', reqId)
            .then(
                (result) => {
                    this.setState({
                        requestInfo: result
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
                Sender: {this.state.requestInfo.userId} <br />
                Message: {this.state.requestInfo.message}
            </div>
        )
    }
}

export default withRouter(RequestInfo);