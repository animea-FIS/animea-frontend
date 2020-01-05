import React, { Component } from 'react';
import M from 'materialize-css';
import { Switch, Route, withRouter, Link} from 'react-router-dom';

import Meeting from './Meeting';
import MeetingsApi from './MeetingsApi';
import { AuthContext } from "../auth/context/auth";

class MeetingsUser extends Component {
    state = {
        meetings: [],
        emptyMessage: ""
    }

    constructor(props) {
        super(props);
        this.getUserMeetings = this.getUserMeetings.bind(this);
    }

    componentDidMount() {
        M.AutoInit();
        this.getUserMeetings(this.props.match.params.userId);
    }

    getUserMeetings(userId) {
        MeetingsApi.getUserMeetings(userId)
            .then(
                (result) => {
                    console.log(result.meetings)
                    var foundMeetings = result.meetings;
                    var messageToShow = "";

                    if (foundMeetings.length == 0) {
                        messageToShow = "Nothing to show ☹"
                    }

                    this.setState({
                        meetings: foundMeetings,
                        emptyMessage: messageToShow
                    })                                        
                },
                (error) => {
                    console.log(error);
                    this.setState({
                        errorInfo: "Problem with connection to server."
                    })
                }
            )
    }

    render() {
        const listItems = this.state.meetings.map((meeting) => <Meeting key={meeting._id} value={meeting} />)

        return (
            <div>
                <div class="row" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 0, width: '90%'}}>            
                    <div class="col s5" style={{fontWeigth: 'bold', fontFamily: 'Belgrano', padding: 30, margin: 0}}>
                        <h4><p>Meetings of the user:</p></h4>
                    </div>
                </div>
                <div>
                    <div class="row" style={{alignItems: 'center', justifyContent: 'center', margin: 'auto', width: '80%'}}>
                        <h4 style={{textAlign: 'center', fontFamily: 'Belgrano', color: '#bdbdbd', fontSize: 40}}><p>{this.state.emptyMessage}</p></h4>
                        {listItems}
                    </div>
                </div>
            </div>

        )
    }
}

MeetingsUser.contextType = AuthContext;
export default MeetingsUser; 