import React, { Component } from 'react';
import M from 'materialize-css';

import MeetingsApi from './MeetingsApi';
import { AuthContext } from "../auth/context/auth";

class MeetingEdition extends Component {
    state = {
        name: this.props.location.state.meetingInfo.name,
        description: this.props.location.state.meetingInfo.description,
        address: this.props.location.state.meetingInfo.address,
        postal_code: this.props.location.state.meetingInfo.postalCode,
        province: this.props.location.state.meetingInfo.province,
        capacity: this.props.location.state.meetingInfo.capacity,
        starting_date: this.props.location.state.meetingInfo.startingDate.toString().substring(0, 10),
        starting_time: this.props.location.state.meetingInfo.startingDate.toString().substring(11, 16),
        ending_date: this.props.location.state.meetingInfo.endingDate.toString().substring(0, 10),
        ending_time: this.props.location.state.meetingInfo.endingDate.toString().substring(11, 16),
        error: "",
    }

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.initDatepicker = this.initDatepicker.bind(this);
        this.initTimepicker = this.initTimepicker.bind(this);
    }

    componentDidMount() {
        M.AutoInit();
        this.initDatepicker();
        this.initTimepicker();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
            [name]: value
        });
    }

    initDatepicker() {
        var context = this;

        var elemStarting = document.querySelector('#starting_date');
        var elemEnding = document.querySelector('#ending_date');

        if (this.props.location.state.meetingInfo && this.props.location.state.meetingInfo.startingDate) {
            var stringStartingDate = this.props.location.state.meetingInfo.startingDate.toString();
            var month = stringStartingDate.substring(5, 7);
            var day = stringStartingDate.substring(8, 10);
            var year = stringStartingDate.substring(0, 4);

            var optionsStarting = {
                autoClose: true,
                format: 'mm/dd/yyyy',
                firstDay: 1,
                defaultDate: new Date(year, Number(month) - 1, day),
                setDefaultDate: true,
                onSelect: function(date) {
                    var month = date.getMonth() + 1;
                    if (month.toString().length == 1) {
                        month = "0" + month.toString();
                    }
    
                    var day = date.getDate();
                    if (day.toString().length == 1) {
                        day = "0" + day.toString();
                    }
    
                    let formatted_date = date.getFullYear() + "-" + month + "-" + day
                    context.setState({
                        starting_date: formatted_date
                    });
                }
            }
        }

        if (this.props.location.state.meetingInfo && this.props.location.state.meetingInfo.endingDate) {
            var stringEndingDate = this.props.location.state.meetingInfo.endingDate.toString();
            var month = stringEndingDate.substring(5, 7);
            var day = stringEndingDate.substring(8, 10);
            var year = stringEndingDate.substring(0, 4);
            
            var optionsEnding = {
                autoClose: true,
                format: 'mm/dd/yyyy',
                firstDay: 1,
                defaultDate: new Date(year, Number(month) - 1, day),
                setDefaultDate: true,
                onSelect: function(date) {
                    var month = date.getMonth() + 1;
                    if (month.toString().length == 1) {
                        month = "0" + month.toString();
                    }
    
                    var day = date.getDate();
                    if (day.toString().length == 1) {
                        day = "0" + day.toString();
                    }
    
                    let formatted_date = date.getFullYear() + "-" + month + "-" + day
                    context.setState({
                        ending_date: formatted_date
                    });
                }
            }
        }

        M.Datepicker.init(elemStarting, optionsStarting);
        M.Datepicker.init(elemEnding, optionsEnding);
    }

    initTimepicker() {
        var context = this;

        var elemStarting = document.querySelector('.timepicker#starting_time');
        var elemEnding = document.querySelector('.timepicker#ending_time');

        if (this.props.location.state.meetingInfo && this.props.location.state.meetingInfo.startingDate) {
        
            var optionsStarting = {
                autoClose: true,
                twelveHour: false,
                defaultTime: this.props.location.state.meetingInfo.startingDate.toString().substring(11, 16),
                onSelect: function(hour, minutes) {
                    var formattedHour = hour;
                    var formattedMinutes = minutes;

                    if (hour.toString().length == 1) {
                        formattedHour = "0" + hour.toString();
                    }

                    if (minutes.toString().length == 1) {
                        formattedMinutes = "0" + minutes.toString();
                    }

                    context.setState({
                        starting_time: formattedHour + ":" + formattedMinutes 
                    })
                }
            }
        }

        if (this.props.location.state.meetingInfo && this.props.location.state.meetingInfo.startingDate) {

            var optionsEnding = {
                autoClose: true,
                twelveHour: false,
                defaultTime: this.props.location.state.meetingInfo.endingDate.toString().substring(11, 16),
                onSelect: function(hour, minutes) {
                    var formattedHour = hour;
                    var formattedMinutes = minutes;

                    if (hour.toString().length == 1) {
                        formattedHour = "0" + hour.toString();
                    }

                    if (minutes.toString().length == 1) {
                        formattedMinutes = "0" + minutes.toString();
                    }

                    context.setState({
                        ending_time: formattedHour + ":" + formattedMinutes 
                    })
                }
            }
        }
        
        M.Timepicker.init(elemStarting, optionsStarting);
        M.Timepicker.init(elemEnding, optionsEnding);
    }

    updateMeeting(meetingId, name, description, address, postal_code, province, capacity, starting_date, starting_time, ending_date, ending_time, userToken) {
        MeetingsApi.updateMeeting(meetingId, name, description, address, postal_code, province, capacity, starting_date, starting_time, ending_date, ending_time, userToken)
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
                        errorInfo: "Problem with connection to server."
                    })
                }
            )
    }

    render() {
        var userToken = this.context.authTokens;

        if (this.props.location.state.meetingInfo && this.props.location.state.meetingInfo.province) {
            switch (this.props.location.state.meetingInfo.province) {
                case 'Albacete':
                    this.props.location.state.meetingInfo.province = "albacete";
                    this.state.province = "albacete";
                    break;
                case 'Alicante':
                    this.props.location.state.meetingInfo.province = "alicante";
                    this.state.province = "alicante";
                    break;
                case 'Almería':
                    this.props.location.state.meetingInfo.province = "almeria";
                    this.state.province = "almeria";
                    break;
                case 'Álava':
                    this.props.location.state.meetingInfo.province = "alava";
                    this.state.province = "alava";
                    break;
                case 'Asturias':
                    this.props.location.state.meetingInfo.province = "asturias";
                    this.state.province = "asturias";
                    break;
                case 'Ávila':
                    this.props.location.state.meetingInfo.province = "avila";
                    this.state.province = "avila";
                    break;
                case 'Badajoz':
                    this.props.location.state.meetingInfo.province = "badajoz";
                    this.state.province = "badajoz";
                    break;
                case 'Baleares':
                    this.props.location.state.meetingInfo.province = "islasbaleares";
                    this.state.province = "islasbaleares";
                    break;
                case 'Barcelona':
                    this.props.location.state.meetingInfo.province = "barcelona";
                    this.state.province = "barcelona";
                    break;
                case 'Vizcaya':
                    this.props.location.state.meetingInfo.province = "vizcaya";
                    this.state.province = "vizcaya";
                    break;
                case 'Burgos':
                    this.props.location.state.meetingInfo.province = "burgos";
                    this.state.province = "burgos";
                    break;
                case 'Cáceres':
                    this.props.location.state.meetingInfo.province = "caceres";
                    this.state.province = "caceres";
                    break;
                case 'Cádiz':
                    this.props.location.state.meetingInfo.province = "cadiz";
                    this.state.province = "cadiz";
                    break;
                case 'Cantabria':
                    this.props.location.state.meetingInfo.province = "cantabria";
                    this.state.province = "cantabria";
                    break;
                case 'Castellón':
                    this.props.location.state.meetingInfo.province = "castellon";
                    this.state.province = "castellon";
                    break;
                case 'Ciudad Real':
                    this.props.location.state.meetingInfo.province = "ciudadreal";
                    this.state.province = "ciudadreal";
                    break;
                case 'Córdoba':
                    this.props.location.state.meetingInfo.province = "cordoba";
                    this.state.province = "cordoba";
                    break;
                case 'La Coruña':
                    this.props.location.state.meetingInfo.province = "acorunya";
                    this.state.province = "acorunya";
                    break;
                case 'Cuenca':
                    this.props.location.state.meetingInfo.province = "cuenca";
                    this.state.province = "cuenca";
                    break;
                case 'Guipúzcoa':
                    this.props.location.state.meetingInfo.province = "guipuzcoa";
                    this.state.province = "guipuzcoa";
                    break;
                case 'Gerona':
                    this.props.location.state.meetingInfo.province = "girona";
                    this.state.province = "girona";
                    break;
                case 'Granada':
                    this.props.location.state.meetingInfo.province = "granada";
                    this.state.province = "granada";
                    break;
                case 'Guadalajara':
                    this.props.location.state.meetingInfo.province = "guadalajara";
                    this.state.province = "guadalajara";
                    break;
                case 'Huelva':
                    this.props.location.state.meetingInfo.province = "huelva";
                    this.state.province = "huelva";
                    break;
                case 'Huesca':
                    this.props.location.state.meetingInfo.province = "huesca";
                    this.state.province = "huesca";
                    break;
                case 'Jaén':
                    this.props.location.state.meetingInfo.province = "jaen";
                    this.state.province = "jaen";
                    break;
                case 'León':
                    this.props.location.state.meetingInfo.province = "leon";
                    this.state.province = "leon";
                    break;
                case 'Lérida':
                    this.props.location.state.meetingInfo.province = "lerida";
                    this.state.province = "lerida";
                    break;
                case 'Lugo':
                    this.props.location.state.meetingInfo.province = "lugo";
                    this.state.province = "lugo";
                    break;
                case 'Madrid':
                    this.props.location.state.meetingInfo.province = "madrid";
                    this.state.province = "madrid";
                    break;
                case 'Málaga':
                    this.props.location.state.meetingInfo.province = "malaga";
                    this.state.province = "malaga";
                    break;
                case 'Murcia':
                    this.props.location.state.meetingInfo.province = "murcia";
                    this.state.province = "murcia";
                    break;
                case 'Navarra':
                    this.props.location.state.meetingInfo.province = "navarra";
                    this.state.province = "navarra";
                    break;
                case 'Orense':
                    this.props.location.state.meetingInfo.province = "ourense";
                    this.state.province = "ourense";
                    break;
                case 'Palencia':
                    this.props.location.state.meetingInfo.province = "palencia";
                    this.state.province = "palencia";
                    break;
                case 'Las Palmas':
                    this.props.location.state.meetingInfo.province = "laspalmas";
                    this.state.province = "laspalmas";
                    break;
                case 'Pontevedra':
                    this.props.location.state.meetingInfo.province = "pontevedra";
                    this.state.province = "pontevedra";
                    break;
                case 'La Rioja':
                    this.props.location.state.meetingInfo.province = "larioja";
                    this.state.province = "larioja";
                    break;
                case 'Salamanca':
                    this.props.location.state.meetingInfo.province = "salamanca";
                    this.state.province = "salamanca";
                    break;
                case 'Santa Cruz de Tenerife':
                    this.props.location.state.meetingInfo.province = "santacruzdetenerife";
                    this.state.province = "santacruzdetenerife";
                    break;
                case 'Segovia':
                    this.props.location.state.meetingInfo.province = "segovia";
                    this.state.province = "segovia";
                    break;
                case 'Sevilla':
                    this.props.location.state.meetingInfo.province = "sevilla";
                    this.state.province = "sevilla";
                    break;
                case 'Soria':
                    this.props.location.state.meetingInfo.province = "soria";
                    this.state.province = "soria";
                    break;
                case 'Tarragona':
                    this.props.location.state.meetingInfo.province = "tarragona";
                    this.state.province = "tarragona";
                    break;
                case 'Teruel':
                    this.props.location.state.meetingInfo.province = "teruel";
                    this.state.province = "teruel";
                    break;
                case 'Toledo':
                    this.props.location.state.meetingInfo.province = "toledo";
                    this.state.province = "toledo";
                    break;
                case 'Valencia':
                    this.props.location.state.meetingInfo.province = "valencia";
                    this.state.province = "valencia";
                    break;
                case 'Valladolid':
                    this.props.location.state.meetingInfo.province = "valladolid";
                    this.state.province = "valladolid";
                    break;
                case 'Zamora':
                    this.props.location.state.meetingInfo.province = "zamora";
                    this.state.province = "zamora";
                    break;
                case 'Zaragoza':
                    this.props.location.state.meetingInfo.province = "zaragoza";
                    this.state.province = "zaragoza";
                    break;
                case 'Ceuta':
                    this.props.location.state.meetingInfo.province = "ceuta";
                    this.state.province = "ceuta";
                    break;
                case 'Melilla':
                    this.props.location.state.meetingInfo.province = "melilla";
                    this.state.province = "melilla";
                    break;
        
                default:
                    this.props.location.state.meetingInfo.province = this.props.location.state.meetingInfo.province;
                    this.state.province = this.state.province;
            }
        }

        var errorBox = "";
        if (this.state.error != "") {
            errorBox = <div class="vertical-center" style={{backgroundColor: '#f50057', borderRadius: 5, boxShadow: "0px 2px 8px 2px rgba(255, 0, 0, .3)", color:'white', fontWeight: 'bold', marginBottom: 14, padding: 10, paddingTop: 12}}>    
                            <p style={{margin: 0}}>{this.state.error}</p>
                        </div>
        }

        return(
            <div>
                {errorBox}
                <div class="col s3" style={{fontWeigth: 'bold', fontFamily: 'Belgrano', padding: 30, paddingLeft: 80}}>
                    <h4><p>Edit the meeting:</p></h4>
                </div>
                <div class="row" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <form class="col s10" style={{margin: 0}} onSubmit={(e) => {this.updateMeeting(this.props.location.state.meetingInfo._id, this.state.name, this.state.description, this.state.address, this.state.postal_code, this.state.province, this.state.capacity, this.state.starting_date, this.state.starting_time, this.state.ending_date, this.state.ending_time, userToken); e.preventDefault();}}>
                        <div class="row">
                            <div class="input-field col s6">
                                <input id="name" name="name" type="text" defaultValue={this.props.location.state.meetingInfo.name} class="validate" maxLength="240" required onChange={this.handleInputChange}/>
                                <label for="name">Name</label>
                            </div>
                            <div class="input-field col s12">
                                <textarea id="description" name="description" defaultValue={this.props.location.state.meetingInfo.description} class="materialize-textarea validate" data-length="500" required onChange={this.handleInputChange}/>
                                <label for="description">Description</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s4">
                                <input id="address" name="address" type="text" defaultValue={this.props.location.state.meetingInfo.address} class="validate" maxLength="240" required onChange={this.handleInputChange}/>
                                <label for="address">Address</label>
                            </div>
                            <div class="input-field col s3">
                                <input id="postal_code" name="postal_code" type="text" defaultValue={this.props.location.state.meetingInfo.postalCode} class="validate" minLength="5" maxLength="5" required onChange={this.handleInputChange}/>
                                <label for="postal_code">Postal Code</label>
                            </div>
                            <div class="input-field col s3">
                                <select id="province" name="province" defaultValue={this.props.location.state.meetingInfo.province} class="input-field validate" required onChange={this.handleInputChange}>
                                    <option value="albacete">Albacete</option>
                                    <option value="alicante">Alicante</option>
                                    <option value="almeria">Almería</option>
                                    <option value="alava">Álava</option>
                                    <option value="asturias">Asturias</option>
                                    <option value="avila">Ávila</option>
                                    <option value="badajoz">Badajoz</option>
                                    <option value="islasbaleares">Baleares</option>
                                    <option value="barcelona">Barcelona</option>
                                    <option value="vizcaya">Vizcaya</option>
                                    <option value="burgos">Burgos</option>
                                    <option value="caceres">Cáceres</option>
                                    <option value="cadiz">Cádiz</option>
                                    <option value="cantabria">Cantabria</option>
                                    <option value="castellon">Castellón</option>
                                    <option value="ciudadreal">Ciudad Real</option>
                                    <option value="cordoba">Córdoba</option>
                                    <option value="acorunya">La Coruña</option>
                                    <option value="cuenca">Cuenca</option>
                                    <option value="guipuzcoa">Guipúzcoa</option>
                                    <option value="girona">Gerona</option>
                                    <option value="granada">Granada</option>
                                    <option value="guadalajara">Guadalajara</option>
                                    <option value="huelva">Huelva</option>
                                    <option value="huesca">Huesca</option>
                                    <option value="jaen">Jaén</option>
                                    <option value="leon">León</option>
                                    <option value="lerida">Lérida</option>
                                    <option value="lugo">Lugo</option>
                                    <option value="madrid">Madrid</option>
                                    <option value="malaga">Málaga</option>
                                    <option value="murcia">Murcia</option>
                                    <option value="navarra">Navarra</option>
                                    <option value="ourense">Orense</option>
                                    <option value="palencia">Palencia</option>
                                    <option value="laspalmas">Las Palmas</option>
                                    <option value="pontevedra">Pontevedra</option>
                                    <option value="larioja">La Rioja</option>
                                    <option value="salamanca">Salamanca</option>
                                    <option value="santacruzdetenerife">Santa Cruz de Tenerife</option>
                                    <option value="segovia">Segovia</option>
                                    <option value="sevilla">Sevilla</option>
                                    <option value="soria">Soria</option>
                                    <option value="tarragona">Tarragona</option>
                                    <option value="teruel">Teruel</option>
                                    <option value="toledo">Toledo</option>
                                    <option value="valencia">Valencia</option>
                                    <option value="valladolid">Valladolid</option>
                                    <option value="zamora">Zamora</option>
                                    <option value="zaragoza">Zaragoza</option>
                                    <option value="ceuta">Ceuta</option>
                                    <option value="melilla">Melilla</option>
                                </select>
                                <label for="province">Province</label>
                            </div>
                            <div class="input-field col s2">
                                <input id="capacity" name="capacity" type="number" defaultValue={this.props.location.state.meetingInfo.capacity} class="validate" min="2" max="500" onChange={this.handleInputChange}/>
                                <label for="capacity">Capacity</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s3">
                                <input id="starting_date" name="starting_date" type="text" class="datepicker validate" required/>
                                <label for="starting_date">Starting Date</label>
                            </div>
                            <div class="input-field col s3">
                                <input id="starting_time" name="starting_time" defaultValue={this.props.location.state.meetingInfo.startingDate.toString().substring(11, 16)} type="text" class="timepicker validate" required/>
                                <label for="starting_time">Starting Time</label>
                            </div>
                            <div class="input-field col s3">
                                <input id="ending_date" name="ending_date" type="text" class="datepicker validate"/>
                                <label for="ending_date">Ending Date</label>
                            </div>
                            <div class="input-field col s3">
                                <input id="ending_time" name="ending_time" defaultValue={this.props.location.state.meetingInfo.endingDate.toString().substring(11, 16)} type="text" class="timepicker validate"/>
                                <label for="ending_time">Ending Time</label>
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

MeetingEdition.contextType = AuthContext;
export default MeetingEdition; 