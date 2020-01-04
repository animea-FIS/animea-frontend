import React, { Component } from 'react';
import { Row } from 'react-materialize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faEnvelopeOpenText, faBirthdayCake, faMapMarkedAlt, faStarHalfAlt, faUserEdit } from '@fortawesome/free-solid-svg-icons'
import ProfileVideo from './ProfileVideo';
import RateProfile from './RateProfile';
import ProfilesApi from './ProfilesApi';
import './Profile.css';


class ShowProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isRating: {},
			ratingValue: 3,
			alreadyRated: false
		}
		this.handleRate = this.handleRate.bind(this);
		this.handleSaveRate = this.handleSaveRate.bind(this);
		this.loadAlredyRated = this.loadAlredyRated.bind(this);
	}

	handleRate(profile) {
		this.setState(prevState => ({
			isRating: { ...prevState.isRating, [profile.username]: profile }
		}));
	}
	handleSaveRate(ratingOption) {
		let value;
		switch (ratingOption) {
			case 'option1':
				value = 1;
				break;
			case 'option2':
				value = 2;
				break;
			case 'option3':
				value = 3;
				break;
			case 'option4':
				value = 4;
				break;
			case 'option5':
				value = 5;
				break;
			default:
				value = null
				break;
		}
		this.saveRate(value);
	}
	saveRate(ratingValue) {
		var userRatingId = "5df9cfb41c9d44000047b038";
		ProfilesApi.addRatingToUser(this.props.profile.id, userRatingId, ratingValue).then((error => {
			console.log(error);
			this.setState({
				errorInfo: "An error ocurred. Please try again later.",
				isRating: false,
				alreadyRated: false
			})
		}, (result) => {
			this.setState({
				errorInfo: null,
				isRating: false,
				alreadyRated: true
			})
			this.props.updateRecentlyRate(ratingValue);
		}))
	}
	handleCancelRate(name, profile) {
		this.setState(prevState => {
			const isRating = Object.assign({}, prevState.isRating);
			delete isRating[name];
			return {
				isRating: isRating
			}
		});
	}

	loadAlredyRated(){
		this.setState({
			alreadyRated: true
		})
	}

	componentDidMount() {
		this.loadAlredyRated();
	  }

	render() {
		let stars = [];
		for (let i = 0; i < this.props.profile.rating; i++) {
			stars.push(<FontAwesomeIcon icon={faStar} />);
		}
		let video_url = (this.props.profile.presentationVideo + "");
		return (
			<div className="container profile-center">
				<Row>
					<Row>
						<div>
							<img src={this.props.profile.profilePic} alt={this.props.profile.username} className="circle tamano-img" /> <h3>{this.props.profile.username}</h3>
						</div>
					</Row>
					<div>
						<h4>{this.props.profile.name}</h4>
						<p><FontAwesomeIcon icon={faEnvelopeOpenText} /> {this.props.profile.email}</p>
						{this.props.profile.birthdate != null &&
							<p><FontAwesomeIcon icon={faBirthdayCake} /> {this.props.profile.birthdate} - <FontAwesomeIcon icon={faMapMarkedAlt} /> {this.props.profile.location}</p>
						}
						{this.props.profile.birthdate == null &&
							<p><FontAwesomeIcon icon={faMapMarkedAlt} /> {this.props.profile.location}</p>
						}
						<p><FontAwesomeIcon icon={faStarHalfAlt} /> Rating: {this.props.rating} {stars} </p>
						<p><FontAwesomeIcon icon={faUserEdit} /> Bio: {this.props.profile.bio}</p>
					</div>
					<Row>
						<div>
							<button className="btn btn-primary" onClick={() => this.props.onEdit(this.props.profile)}>Edit</button>
						</div>
					</Row>
					{this.state.isRating[this.props.profile.username] ?
						<Row>
							<RateProfile key={this.props.profile.username} ratingValue={this.state.ratingValue}
								onSaveRate={this.handleSaveRate}
								onCancelRate={this.handleCancelRate.bind(this, this.props.profile.username)} />
						</Row>
						:
						!this.props.alreadyRated ?
							<Row>
								<button className="btn btn-primary" onClick={() => this.handleRate(this.props.profile)}>Rate user</button>
							</Row>
							:
						<p>You have rated this user with {this.props.alreadyRatedValue} <FontAwesomeIcon icon={faStar} /></p>
					}
					<div>
						<ProfileVideo presentationVideo={video_url} />
					</div>
				</Row>
			</div>
		)
	}
}

export default ShowProfile;