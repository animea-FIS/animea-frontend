import React, { Component } from 'react';
import ProfilesApi from './ProfilesApi';
import M from "materialize-css";
import './Profile.css';
import { Row } from 'react-materialize';
import { AuthContext } from "../auth/context/auth";
import SmallProfileList from './SmallProfileList';

class Profiles extends Component {
    state = {
        users:[],
        errorInfo: null
    };

    constructor(props) {
        super(props);
        this.getAllUsers = this.getAllUsers.bind(this);
    }

    componentDidMount() {
        M.AutoInit();
        this.getAllUsers();
    };

    getAllUsers() {
        ProfilesApi.getAllUsers()
          .then(
            (result) => {
              var foundUsers = result
              this.setState({
                users: foundUsers,
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
        const listItems = this.state.users.map((user) =>
            <div>
                <SmallProfileList user={user} />
            </div>
        );
        return (
            <div className="container">
                {this.state.users.length !== 0 &&
                    <span>
                        <Row>
                            {listItems}
                            <hr />
                        </Row>

                    </span>
                }
                {this.state.users.length === 0 &&
                    <span>There are no users in the system.</span>
                }
            </div>
        );
    }
}

Profiles.contextType = AuthContext;
export default Profiles;