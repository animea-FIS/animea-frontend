import React, { Component } from 'react';
import M from 'materialize-css';

import Meeting from './Meeting';
import MeetingsApi from './MeetingsApi';

class Meetings extends Component {
    state = {
        meetings: [],
        pageNumber: 1,
        windowsSize: document.documentElement.clientHeight,
        province: ""
    }

    constructor(props) {
        super(props);
        this.getAllMeetings = this.getAllMeetings.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.provinceChange = this.provinceChange.bind(this);
    }

    componentDidMount() {
        M.AutoInit();
        window.addEventListener('scroll', this.handleScroll);
        this.getAllMeetings();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    getAllMeetings() {
        MeetingsApi.getAllMeetings(this.state.pageNumber, this.state.province)
            .then(
                (result) => {
                    console.log(result.meetings)
                    var foundMeetings = []
                    if (this.state.meetings.length > 0 && this.state.province == "") {
                        foundMeetings = this.state.meetings.concat(result.meetings);
                    } else {
                        foundMeetings = result.meetings;
                    }

                    this.setState({
                        meetings: foundMeetings
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

    handleScroll = (e) => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (Math.ceil(windowBottom) >= docHeight) {
            this.setState({
              pageNumber: this.state.pageNumber + 1,
              windowsSize: html.clientHeight
            },
            function () {
                this.getAllMeetings();
            })
          }
    }

    provinceChange = () => {
        var selectBox = document.getElementById("selectBox");
        var selectedValue = selectBox.options[selectBox.selectedIndex].value;

        this.setState({
            province: selectedValue.toString(),
            pageNumber: 1
        }, 
        function () {
            this.getAllMeetings();
        });
    }

    render() {
        const listItems = this.state.meetings.map((meeting) => <Meeting key={meeting._id} value={meeting} />)

        return (
            <div>
                <div class="row" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 0 }}>            
                    <div class="col s2" style={{fontWeigth: 'bold', fontFamily: 'Belgrano', padding: 30}}>
                        <h4 style={{paddingLeft: 20}}><p>Meetings</p></h4>
                    </div>
                    <div class="col s1">
                        <i className="material-icons" style={{color: '#ffd54f', fontSize: 40}}>add_circle</i>
                    </div>
                    <div class="col s6" style={{textAlign: 'center', padding: 30}}>
                        <nav style={{borderRadius: 100, overflow: 'hidden'}}>
                            <div class="nav-wrapper amber lighten-2">
                            <form>
                                <div class="input-field">
                                <input id="search" type="search" required style={{margin: 0}}/>
                                <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                                <i class="material-icons">close</i>
                                </div>
                            </form>
                            </div>
                        </nav>
                    </div>
                    <div class="col s3" style={{padding: 30}}>
                        <select id="selectBox" class="input-field" onChange={() => this.provinceChange()}>
                            <option value="" disabled selected>Filter by province</option>
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
                    </div>
                </div>
                <div>
                    <div class="row" style={{alignItems: 'center', justifyContent: 'center', margin: 'auto', width: '80%'}}>
                        {listItems}
                    </div>
                </div>
            </div>

        )
    }
}

export default Meetings; 