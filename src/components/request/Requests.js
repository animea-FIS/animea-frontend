import React, { Component } from 'react';
import RequestsApi from './RequestsApi';
import Request from './Request';
import M from "materialize-css";
import './Requests.css';
import { Row } from 'react-materialize';

class Requests extends Component {
  state = {
    requests: [],
    windowsSize: document.documentElement.clientHeight,
    myList: false,
  };

  constructor(props) {
    super(props);
    this.getAllRequests = this.getAllRequests.bind(this);
    this.getMyRequests = this.getMyRequests.bind(this);
    this.removeRequest = this.removeRequest.bind(this);
    this.removeAllRequests = this.removeAllRequests.bind(this);
  }

  componentDidMount() {
    M.AutoInit();
    this.getAllRequests();
  }

  getAllRequests() {
    RequestsApi.getCreatedRequests('5df9cfb41c9d44000047b035')
      .then(
        (result) => {
          var foundRequests = [];
          if (this.state.requests.length > 0 && !this.state.myList) {
            foundRequests = this.state.requests.concat(result);
          } else {
            foundRequests = result;
          }
          this.setState({
            requests: foundRequests,
            myList: false
          });
        },
        (error) => {
          console.log(error)
          this.setState({
            errorInfo: "Problem with connection to server"
          });
        }
      );
  }

  getMyRequests() {
    RequestsApi.getMyRequests("5df9cfb41c9d44000047b035")
      .then(
        (result) => {
          console.log(result)
          this.setState({
            requests: result,
            myList: true,
          });
        },
        (error) => {
          console.log(error)
          this.setState({
            errorInfo: "Problem with connection to server"
          });
        }
      );
  }

  acceptRequest(reqId) {
    RequestsApi.acceptRequest("5df9cfb41c9d44000047b035", reqId).then(
      () => {
        RequestsApi.getMyRequests('5df9cfb41c9d44000047b035')
        .then(
          (result) => {
            var foundRequests = result
            this.setState({
              requests: foundRequests,
            });
          },
          (error) => {
            console.log(error)
            this.setState({
              errorInfo: "Problem with connection to server"
            });
          }
        );
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
    RequestsApi.removeRequest("5df9cfb41c9d44000047b035", reqId).then(
      () => {
        var nextReq;
        if (!this.state.myList) nextReq = RequestsApi.getCreatedRequests('5df9cfb41c9d44000047b035');
        else if (this.state.myList) nextReq = RequestsApi.getMyRequests('5df9cfb41c9d44000047b035');
        nextReq
        .then(
          (result) => {
            var foundRequests = result
            this.setState({
              requests: foundRequests,
            });
          },
          (error) => {
            console.log(error)
            this.setState({
              errorInfo: "Problem with connection to server"
            });
          }
        );
      },
      (error) => {
        console.log(error);
        this.setState({
          errorInfo: "Connection problem"
        })
      }
    )
  }

  removeAllRequests() {
    RequestsApi.removeAllRequests("5df9cfb41c9d44000047b035").then(
      () => {
        RequestsApi.getCreatedRequests('5df9cfb41c9d44000047b035')
        .then(
          (result) => {
            var foundRequests = result
            this.setState({
              requests: foundRequests,
            });
          },
          (error) => {
            console.log(error)
            this.setState({
              errorInfo: "Problem with connection to server"
            });
          }
        );
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
    var listMsg;
    if (this.state.myList) {
      listMsg = "Sent requests";
    } else {
      listMsg = "Received requests";
    }
    const listItems = this.state.requests.map((req) =>
      <div>
        <Request value={req} />
        {this.state.myList &&
          <a key="1" href="#" onClick={() => this.acceptRequest(req.id)}>
            <i className="material-icons">add_circle</i>
              Accept request
          </a>
        }
        <a key="1" href="#" onClick={() => this.removeRequest(req.id)}>
          <i className="material-icons">remove_circle</i>
            Remove request
        </a>
      </div>
    );
    return (
      <div className="container">
        <div className="col s2">
          <br />
          <button onClick={this.state.myList ? () => this.getAllRequests() : () => this.getMyRequests()} className="btn waves-effect waves-light" type="submit" name="action">{listMsg}
            <i className="material-icons right">library_books</i>
          </button>
        </div>
        {this.state.requests.length !== 0 &&
          <span>
            <Row>
              {listItems}
              <hr />
            </Row>
            {!this.state.myList &&
              <a key="1" href="#" onClick={() => this.removeAllRequests()}>
                <i className="material-icons">remove_circle</i>
                  Remove all requests
              </a>
            }
          </span>
        }
        {this.state.requests.length === 0 &&
          <span>You have no requests</span>
        }
      </div>
    );
  }
}

export default Requests;