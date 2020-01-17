import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'


class RateProfile extends Component{
    constructor(props){
        super(props);
        this.state= {
            selectedOption: 'option3'
        }
        this.handleOptionChange = this.handleOptionChange.bind(this);
    }

    handleOptionChange(event){
        this.setState({
            selectedOption: event.target.name,
        })
    }

    render(){
        return (
            
                <div className="container profile-center">
                    <label>
                        <input name="option1" type="radio" className="with-gap" 
                        checked={this.state.selectedOption === 'option1'}
                        onChange={this.handleOptionChange} />
                        <span>1<FontAwesomeIcon icon={faStar}/> </span>
                    </label>
                    <label>
                        <input name="option2" type="radio" className="with-gap" 
                        checked={this.state.selectedOption === 'option2'}
                        onChange={this.handleOptionChange} />
                        <span>2<FontAwesomeIcon icon={faStar}/> </span>
                    </label>
                    <label>
                        <input name="option3" type="radio" className="with-gap" 
                        checked={this.state.selectedOption === 'option3'}
                        onChange={this.handleOptionChange} />
                        <span>3<FontAwesomeIcon icon={faStar}/> </span>
                    </label>
                    <label>
                        <input name="option4" type="radio" className="with-gap" 
                        checked={this.state.selectedOption === 'option4'}
                        onChange={this.handleOptionChange} />
                        <span>4<FontAwesomeIcon icon={faStar}/> </span>
                    </label>
                    <label>
                        <input name="option5" type="radio" className="with-gap" 
                        checked={this.state.selectedOption === 'option5'}
                        onChange={this.handleOptionChange} />
                        <span>5<FontAwesomeIcon icon={faStar}/> </span>
                    </label>
                
                <div>
                <button data-testid="save" className="btn btn-default" onClick={() => this.props.onSaveRate(this.state.selectedOption)}>Rate</button>
                <button data-testid="cancel" className="btn btn-primary" onClick={() => this.props.onCancelRate(this.props.profile)}>Cancel</button>
                </div></div>
        )
      }
}

/*function RateProfile(props){
    return(
        <div className="container profile-center">
            <p>Abajo deberia aparecer el select</p>
            <select value={props.ratingValue}>
                <option value="1">1 </option>
                <option value="1">2 </option>
                <option value="1">3 </option>
                <option value="1">4 </option>
                <option value="1">5 </option>
            </select>
            <button className="btn btn-primary" onClick={() => props.onSaveRate(props.profile)}>Rate</button>
            <button className="btn btn-primary" onClick={() => props.onCancelRate(props.profile)}>Cancel</button>
        </div>
    )
}*/

export default RateProfile;