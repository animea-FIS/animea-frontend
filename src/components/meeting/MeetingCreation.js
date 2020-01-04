import React, { Component } from 'react';
import M from 'materialize-css';

import MeetingsApi from './MeetingsApi';

class MeetingCreation extends Component {
    state = {
        name: "",
        description: "",
        address: "",
        postal_code: "",
        province: "albacete",
        capacity: "",
        starting_date: "",
        starting_time: "",
        ending_date: "",
        ending_time: ""
    }

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.createMeeting = this.createMeeting.bind(this);
        this.initDatepicker = this.initDatepicker.bind(this);
        this.initTimepicker = this.initTimepicker.bind(this);
    }

    componentDidMount() {
        document.addEventListener('DOMContentLoaded', this.initDatepicker);
        M.AutoInit();
        this.initDatepicker();
        this.initTimepicker();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.name.includes("ing_") ? target : target.value;
        const name = target.name;
    
        this.setState({
            [name]: value
        });
    }

    initDatepicker() {
        var context = this;

        var elemStarting = document.querySelector('#starting_date');
        var elemEnding = document.querySelector('#ending_date');
        
        var optionsStarting = {
            autoClose: true,
            format: 'mm/dd/yyyy',
            firstDay: 1,
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

        var optionsEnding = {
            autoClose: true,
            format: 'mm/dd/yyyy',
            firstDay: 1,
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

        M.Datepicker.init(elemStarting, optionsStarting);
        M.Datepicker.init(elemEnding, optionsEnding);
    }

    initTimepicker() {
        var context = this;

        var elemStarting = document.querySelector('.timepicker#starting_time');
        var elemEnding = document.querySelector('.timepicker#ending_time');
        
        var optionsStarting = {
            autoClose: true,
            twelveHour: false,
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

        var optionsEnding = {
            autoClose: true,
            twelveHour: false,
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
        
        M.Timepicker.init(elemStarting, optionsStarting);
        M.Timepicker.init(elemEnding, optionsEnding);
    }

    createMeeting(name, description, address, postal_code, province, capacity, starting_date, starting_time, ending_date, ending_time) {
        MeetingsApi.createMeeting(name, description, address, postal_code, province, capacity, starting_date, starting_time, ending_date, ending_time)
            .then(
                (result) => {
                    console.log(result);
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
        return(
            <div>
                <div class="col s3" style={{fontWeigth: 'bold', fontFamily: 'Belgrano', padding: 30, paddingLeft: 80}}>
                    <h4><p>Create a new meeting:</p></h4>
                </div>
                <div class="row" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <form class="col s10" style={{margin: 0}} onSubmit={(e) => {this.createMeeting(this.state.name, this.state.description, this.state.address, this.state.postal_code, this.state.province, this.state.capacity, this.state.starting_date, this.state.starting_time, this.state.ending_date, this.state.ending_time); e.preventDefault();}}>
                        <div class="row">
                            <div class="input-field col s6">
                                <input id="name" name="name" type="text" class="validate" maxlength="240" required onChange={this.handleInputChange}/>
                                <label for="name">Name</label>
                            </div>
                            <div class="input-field col s12">
                                <textarea id="description" name="description" class="materialize-textarea validate" data-length="500" required onChange={this.handleInputChange}/>
                                <label for="description">Description</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s4">
                                <input id="address" name="address" type="text" class="validate" maxlength="240" required onChange={this.handleInputChange}/>
                                <label for="address">Address</label>
                            </div>
                            <div class="input-field col s3">
                                <input id="postal_code" name="postal_code" type="text" class="validate" minlength="5" maxlength="5" required onChange={this.handleInputChange}/>
                                <label for="postal_code">Postal Code</label>
                            </div>
                            <div class="input-field col s3">
                                <select id="province" name="province" class="input-field validate" required onChange={this.handleInputChange}>
                                    <option value="albacete" selected>Albacete</option>
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
                                <input id="capacity" name="capacity" type="number" class="validate" min="2" max="500" onChange={this.handleInputChange}/>
                                <label for="capacity">Capacity</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s3">
                                <input id="starting_date" name="starting_date" type="text" class="datepicker validate" required/>
                                <label for="starting_date">Starting Date</label>
                            </div>
                            <div class="input-field col s3">
                                <input id="starting_time" name="starting_time" type="text" class="timepicker validate" required/>
                                <label for="starting_time">Starting Time</label>
                            </div>
                            <div class="input-field col s3">
                                <input id="ending_date" name="ending_date" type="text" class="datepicker validate"/>
                                <label for="ending_date">Ending Date</label>
                            </div>
                            <div class="input-field col s3">
                                <input id="ending_time" name="ending_time" type="text" class="timepicker validate"/>
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

export default MeetingCreation; 