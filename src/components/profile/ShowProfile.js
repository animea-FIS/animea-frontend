import React, { Component } from 'react';
import { Row, Col } from 'react-materialize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faEnvelopeOpenText, faBirthdayCake, faMapMarkedAlt, faStarHalfAlt, faUserEdit, faHashtag } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import ProfileVideo from './ProfileVideo';
import RateProfile from './RateProfile';
import ProfilesApi from './ProfilesApi';
import './Profile.css';
import { AuthContext } from "../auth/context/auth";


class ShowProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isRating: {},
			ratingValue: 3,
			alreadyRated: this.props.alreadyRated
		}
		this.handleRate = this.handleRate.bind(this);
		this.handleSaveRate = this.handleSaveRate.bind(this);
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
		var userRatingId = this.context.userId;
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

	componentDidMount() {

	}

	render() {
		let stars = [];
		for (let i = 0; i < this.props.profile.rating; i++) {
			stars.push(<FontAwesomeIcon icon={faStar} />);
		}
		let video_url = (this.props.profile.presentationVideo + "");
		let user_animes_url = `/user/${this.context.userId}/animes`;
		return (
			<div className="container profile-center">
				<Row>
					<Row>
						<div>
							<img src={this.props.profile.profilePic} alt={this.props.profile.username} className="circle tamano-img" /> <h3>{this.props.profile.username}  <button data-testid="edit" className="btn btn-primary" onClick={() => this.props.onEdit(this.props.profile)}><i className="material-icons left">person</i>Edit</button></h3>
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
						<div>
							<FontAwesomeIcon icon={faStarHalfAlt} /> Rating: {this.props.rating} {stars}
							{this.props.profile.id !== this.context.userId &&
								<p>
									{this.state.isRating[this.props.profile.username] ?
											<RateProfile key={this.props.profile.username} ratingValue={this.state.ratingValue}
												onSaveRate={this.handleSaveRate}
												onCancelRate={this.handleCancelRate.bind(this, this.props.profile.username)} />
										:
										!this.props.alreadyRated ?
											
												<button className="btn yellow accent-2 text-black" onClick={() => this.handleRate(this.props.profile)}><i className="material-icons left">stars</i>Rate user</button>
											
											:
											<p>You have rated this user with {this.props.alreadyRatedValue} <FontAwesomeIcon icon={faStar} /></p>
									}
								</p>
							}
						</div>
						<p><FontAwesomeIcon icon={faTwitter} /> Twitter account: {this.props.profile.twitterUsername}</p>
						<p><FontAwesomeIcon icon={faHashtag} /> Last Tweet: {this.props.lastTweet}</p>
						<p><FontAwesomeIcon icon={faUserEdit} /> Bio: {this.props.profile.bio}</p>
					</div>
					<Row>
						<Col s={6}>
							<a className="btn waves-effect deep-purple lighten-3" href={user_animes_url} role="button"><i className="material-icons left">movie_filter</i>User animes</a>
						</Col>
						<Col s={6}>
							<a className="btn waves-effec light-green" href="/" role="button"><i className="material-icons left">group</i>Show meetings</a>
						</Col>
					</Row>

					<div>
						<ProfileVideo presentationVideo={video_url} />
					</div>
				</Row>
			</div>
		)
	}
}

ShowProfile.contextType = AuthContext;
export default ShowProfile;