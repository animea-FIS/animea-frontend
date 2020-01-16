import React, { Component } from 'react';
import M from 'materialize-css';
import { Switch, Route, withRouter, Link} from 'react-router-dom';

import MeetingsApi from './MeetingsApi';
import { AuthContext } from "../auth/context/auth";
import MeetingEdition from './MeetingEdition';

class MeetingInfo extends Component {

    state = {
        meetingInfo: {},
        error: ""
    };

    constructor(props) {
        super(props);
        this.getMeetingById = this.getMeetingById.bind(this);
        this.joinMeeting = this.joinMeeting.bind(this);
    }

    componentDidMount() {
        M.AutoInit();
    }

    componentWillMount() {
        this.getMeetingById(this.props.match.params.meetingId);
    }

    getMeetingById(meetingId) {
        MeetingsApi.getMeetingById(meetingId)
            .then(
                (result) => {
                    console.log(result)
                    if (!result.error) {
                        this.setState({
                            error: "",
                            meetingInfo: result.meeting
                        });
                    } else {
                        this.setState({
                            error: result.error
                        });
                    }
                },
                (error) => {
                    console.log(error)
                    this.setState({
                        errorInfo: "Problem with connection to server."
                    })
                }
            )
    };

    joinMeeting(meetingId, userToken) {
        MeetingsApi.joinMeeting(meetingId, userToken)
            .then(
                (result) => {
                    console.log(result)
                    if (!result.error) {
                        this.setState({
                            error: ""
                        });
                    } else {
                        this.setState({
                            error: result.error
                        });
                    }
                },
                (error) => {
                    console.log(error)
                    this.setState({
                        errorInfo: "Problem with connection to server.<"
                    })
                }
            )
    }

    deleteMeeting(meetingId, userToken) {
        MeetingsApi.deleteMeeting(meetingId, userToken)
            .then(
                (result) => {
                    console.log(result);
                    if (!result.error) {
                        this.setState({
                            error: ""
                        });
                        window.location = "http://localhost:3000/meetings";
                    } else {
                        this.setState({
                            error: result.error
                        });
                    }
                },
                (error) => {
                    console.log(error)
                    this.setState({
                        errorInfo: "Problem with connection to server.<"
                    })
                }
            )
    }

    leaveMeeting(meetingId, userToken) {
        MeetingsApi.leaveMeeting(meetingId, userToken)
            .then(
                (result) => {
                    console.log(result);
                    if (!result.error) {
                        this.setState({
                            error: ""
                        });
                    } else {
                        this.setState({
                            error: result.error
                        });
                    }
                },
                (error) => {
                    console.log(error)
                    this.setState({
                        errorInfo: "Problem with connection to server.<"
                    })
                }
            )
    }

    render() {

        if (this.state.meetingInfo && this.state.meetingInfo.province) {
            switch (this.state.meetingInfo.province) {
                case 'albacete':
                    this.state.meetingInfo.province = "Albacete";
                    break;
                case 'alicante':
                    this.state.meetingInfo.province = "Alicante";
                    break;
                case 'almeria':
                    this.state.meetingInfo.province = "Almería";
                    break;
                case 'alava':
                    this.state.meetingInfo.province = "Álava";
                    break;
                case 'asturias':
                    this.state.meetingInfo.province = "Asturias";
                    break;
                case 'avila':
                    this.state.meetingInfo.province = "Ávila";
                    break;
                case 'badajoz':
                    this.state.meetingInfo.province = "Badajoz";
                    break;
                case 'islasbaleares':
                    this.state.meetingInfo.province = "Baleares";
                    break;
                case 'barcelona':
                    this.state.meetingInfo.province = "Barcelona";
                    break;
                case 'vizcaya':
                    this.state.meetingInfo.province = "Vizcaya";
                    break;
                case 'burgos':
                    this.state.meetingInfo.province = "Burgos";
                    break;
                case 'caceres':
                    this.state.meetingInfo.province = "Cáceres";
                    break;
                case 'cadiz':
                    this.state.meetingInfo.province = "Cádiz";
                    break;
                case 'cantabria':
                    this.state.meetingInfo.province = "Cantabria";
                    break;
                case 'castellon':
                    this.state.meetingInfo.province = "Castellón";
                    break;
                case 'ciudadreal':
                    this.state.meetingInfo.province = "Ciudad Real";
                    break;
                case 'cordoba':
                    this.state.meetingInfo.province = "Córdoba";
                    break;
                case 'acorunya':
                    this.state.meetingInfo.province = "La Coruña";
                    break;
                case 'cuenca':
                    this.state.meetingInfo.province = "Cuenca";
                    break;
                case 'guipuzcoa':
                    this.state.meetingInfo.province = "Guipúzcoa";
                    break;
                case 'girona':
                    this.state.meetingInfo.province = "Gerona";
                    break;
                case 'granada':
                    this.state.meetingInfo.province = "Granada";
                    break;
                case 'guadalajara':
                    this.state.meetingInfo.province = "Guadalajara";
                    break;
                case 'huelva':
                    this.state.meetingInfo.province = "Huelva";
                    break;
                case 'huesca':
                    this.state.meetingInfo.province = "Huesca";
                    break;
                case 'jaen':
                    this.state.meetingInfo.province = "Jaén";
                    break;
                case 'leon':
                    this.state.meetingInfo.province = "León";
                    break;
                case 'lerida':
                    this.state.meetingInfo.province = "Lérida";
                    break;
                case 'lugo':
                    this.state.meetingInfo.province = "Lugo";
                    break;
                case 'madrid':
                    this.state.meetingInfo.province = "Madrid";
                    break;
                case 'malaga':
                    this.state.meetingInfo.province = "Málaga";
                    break;
                case 'murcia':
                    this.state.meetingInfo.province = "Murcia";
                    break;
                case 'navarra':
                    this.state.meetingInfo.province = "Navarra";
                    break;
                case 'ourense':
                    this.state.meetingInfo.province = "Orense";
                    break;
                case 'palencia':
                    this.state.meetingInfo.province = "Palencia";
                    break;
                case 'laspalmas':
                    this.state.meetingInfo.province = "Las Palmas";
                    break;
                case 'pontevedra':
                    this.state.meetingInfo.province = "Pontevedra";
                    break;
                case 'larioja':
                    this.state.meetingInfo.province = "La Rioja";
                    break;
                case 'salamanca':
                    this.state.meetingInfo.province = "Salamanca";
                    break;
                case 'santacruzdetenerife':
                    this.state.meetingInfo.province = "Santa Cruz de Tenerife";
                    break;
                case 'segovia':
                    this.state.meetingInfo.province = "Segovia";
                    break;
                case 'sevilla':
                    this.state.meetingInfo.province = "Sevilla";
                    break;
                case 'soria':
                    this.state.meetingInfo.province = "Soria";
                    break;
                case 'tarragona':
                    this.state.meetingInfo.province = "Tarragona";
                    break;
                case 'teruel':
                    this.state.meetingInfo.province = "Teruel";
                    break;
                case 'toledo':
                    this.state.meetingInfo.province = "Toledo";
                    break;
                case 'valencia':
                    this.state.meetingInfo.province = "Valencia";
                    break;
                case 'valladolid':
                    this.state.meetingInfo.province = "Valladolid";
                    break;
                case 'zamora':
                    this.state.meetingInfo.province = "Zamora";
                    break;
                case 'zaragoza':
                    this.state.meetingInfo.province = "Zaragoza";
                    break;
                case 'ceuta':
                    this.state.meetingInfo.province = "Ceuta";
                    break;
                case 'melilla':
                    this.state.meetingInfo.province = "Melilla";
                    break;
        
                default:
                    this.state.meetingInfo.province = this.state.meetingInfo.province;
            }
        }

        var infoStartingDate = "";
        var infoEndingDate = "";

        if (this.state.meetingInfo && this.state.meetingInfo.startingDate) {
            var stringStartingDate = this.state.meetingInfo.startingDate.toString();
            var month = stringStartingDate.substring(5, 7);
            var day = stringStartingDate.substring(8, 10);
            var year = stringStartingDate.substring(0, 4);
            var hour = stringStartingDate.substring(11, 16);

            infoStartingDate = "Starting Date: " + month + "/" + day + "/" + year + " " + hour;
        }

        if (this.state.meetingInfo && this.state.meetingInfo.endingDate) {
            var stringEndingDate = this.state.meetingInfo.endingDate.toString();
            var month = stringEndingDate.substring(5, 7);
            var day = stringEndingDate.substring(8, 10);
            var year = stringEndingDate.substring(0, 4);
            var hour = stringEndingDate.substring(11, 16);

            infoEndingDate = "Ending Date: " + month + "/" + day + "/" + year + " " + hour;
        }

        var numberParticipants = "";
        var totalCapacity = "";

        if (this.state.meetingInfo && this.state.meetingInfo.members) {
            numberParticipants = this.state.meetingInfo.members.length;
        }

        if (this.state.meetingInfo && this.state.meetingInfo.capacity) {
            totalCapacity = "Total capacity: " + this.state.meetingInfo.capacity;
        }
        
        var joinButton = "";
        
        if (this.context.authTokens && 
            this.state.meetingInfo && 
            this.state.meetingInfo.capacity && this.state.meetingInfo.members && this.state.meetingInfo.members.length < this.state.meetingInfo.capacity &&
            this.state.meetingInfo.startingDate && new Date(this.state.meetingInfo.startingDate).getTime() > new Date(Date.now()).getTime() &&
            !this.state.meetingInfo.members.includes(this.context.userId)) {

            var userToken = this.context.authTokens;

            joinButton = <div class="col s2" style={{margin: 0, float: 'left'}}>
                            <a class="waves-effect waves-light btn" onClick={(e) => {this.joinMeeting(this.props.match.params.meetingId, userToken); e.preventDefault();}} style={{backgroundColor: '#ffd54f', color: 'black', fontFamily: 'Belgrano'}}>
                                Join<i class="material-icons right">person_add</i>
                            </a>
                        </div>
        }

        var leaveButton = "";
        
        if (this.context.authTokens && 
            this.state.meetingInfo && this.state.meetingInfo.members &&
            this.state.meetingInfo.startingDate && new Date(this.state.meetingInfo.startingDate).getTime() > new Date(Date.now()).getTime() &&
            this.state.meetingInfo.creatorId && userId && this.state.meetingInfo.creatorId.toString().localeCompare(userId.toString()) != 0 &&
            this.state.meetingInfo.members.includes(this.context.userId)) {

            var userToken = this.context.authTokens;

            leaveButton = <div class="col s2" style={{margin: 0, float: 'left'}}>
                            <a class="waves-effect waves-light btn" onClick={(e) => {this.leaveMeeting(this.props.match.params.meetingId, userToken); e.preventDefault();}} style={{backgroundColor: '#ffd54f', color: 'black', fontFamily: 'Belgrano'}}>
                                Leave<i class="material-icons right">person_add_disabled</i>
                            </a>
                        </div>
        }

        var editButton = "";
        var deleteButton = "";
        var userId = this.context.userId;
        
        if (this.context.authTokens && 
            this.state.meetingInfo && 
            this.state.meetingInfo.startingDate && new Date(this.state.meetingInfo.startingDate).getTime() > new Date(Date.now()).getTime() &&
            this.state.meetingInfo.creatorId && userId && this.state.meetingInfo.creatorId.toString().localeCompare(userId.toString()) == 0) {

            var userToken = this.context.authTokens;

            editButton = <Link to={{pathname:"/meetings/edit-meeting", state: {meetingInfo: this.state.meetingInfo}}}>
                            <div class="col s2" style={{margin: 0, float: 'left'}}>
                                <a class="waves-effect waves-light btn" style={{backgroundColor: '#ffd54f', color: 'black', fontFamily: 'Belgrano'}}>
                                    Edit<i class="material-icons right">edit</i>
                                </a>
                            </div>
                        </Link>

            deleteButton = <div class="col s2" style={{margin: 0, float: 'left'}}>
                                <a class="waves-effect waves-light btn" onClick={(e) => {this.deleteMeeting(this.props.match.params.meetingId, userToken); e.preventDefault();}} style={{backgroundColor: '#ffd54f', color: 'black', fontFamily: 'Belgrano'}}>
                                    Delete<i class="material-icons right">delete_forever</i>
                                </a>
                            </div>
        }

        var errorBox = "";
        if (this.state.error != "") {
            errorBox = <div class="vertical-center" style={{backgroundColor: '#f50057', borderRadius: 5, boxShadow: "0px 2px 8px 2px rgba(255, 0, 0, .3)", color:'white', fontWeight: 'bold', marginBottom: 14, padding: 10, paddingTop: 12}}>    
                            <p style={{margin: 0}}>{this.state.error}</p>
                        </div>
        }

        return (
            <div style={{fontFamily: 'Belgrano'}}>
                {errorBox}
                <div class="row" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>            
                    <div class="col s6" style={{fontWeigth: 'bold', padding: 30, margin: 0}}>
                        <h4>{this.state.meetingInfo.name}</h4>
                    </div>
                    {joinButton}
                    {leaveButton}
                    {editButton}
                    {deleteButton}
                </div>
                <div class="row" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <ul class="col s3 collapsible popout" style={{margin: 0}}>
                        <li style={{borderRadius: 10}}>
                            <div class="collapsible-header amber lighten-2" style={{borderRadius: 10}}><i class="material-icons">calendar_today</i>Date and Time</div>
                            <div class="collapsible-body amber lighten-5" style={{borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderTopLeftRadius: 0, borderTopRightRadius: 0}}>
                                <span>{infoStartingDate}</span>
                                <p>{infoEndingDate}</p>
                            </div>
                        </li>
                        <li style={{borderRadius: 10}}>
                            <div class="collapsible-header amber lighten-2" style={{borderRadius: 10}}><i class="material-icons">place</i>Location</div>
                            <div class="collapsible-body amber lighten-5" style={{borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderTopLeftRadius: 0, borderTopRightRadius: 0}}>
                                <span>{this.state.meetingInfo.address}</span>
                                <p>{this.state.meetingInfo.postalCode}</p>
                                <span>{this.state.meetingInfo.province}</span>
                            </div>
                        </li>
                        <li style={{borderRadius: 10}}>
                            <div class="collapsible-header amber lighten-2" style={{borderRadius: 10}}><i class="material-icons">group</i>Participants</div>
                            <div class="collapsible-body amber lighten-5" style={{borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderTopLeftRadius: 0, borderTopRightRadius: 0}}>
                                <span>Current amount: {numberParticipants}</span>
                                <p>{totalCapacity}</p>
                            </div>
                        </li>
                    </ul>
                    <div class="col s5" style={{margin: 0}}>
                        <div class="card amber lighten-5" style={{borderRadius: 10}}>
                            <div class="card-content">
                            <span class="card-title" style={{fontSize: 24}}>Description</span>
                            <p style={{fontSize: 15}}>{this.state.meetingInfo.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

MeetingInfo.contextType = AuthContext;
export default withRouter(MeetingInfo);