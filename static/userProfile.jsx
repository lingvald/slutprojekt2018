var React = require('react');
var axios = require('axios');
class userProfile extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
			opponent: ''
        };
    }
	componentDidMount(){
		axios.get('/api/users/' + this.props.match.params.user)
		.then(result => {
		var currentOpponent = result.data;
		this.setState({opponent: currentOpponent[0]});
	});
	}
	render(){
		return (<div id="user-profile">
				<div>
					<h3 id="myInfo-heading">{this.state.opponent.username}s Profil</h3>
					<div id="profile-image" style={{backgroundImage: 'url(' + this.state.opponent.image + ')'}}></div>
					<span className="profile-headings">Ålder</span>
					<p id="profile-age">{this.state.opponent.age} år</p>
					<span className="profile-headings">Stad</span>
					<p id="profile-city">{this.state.opponent.city}</p>
					<span className="profile-headings">Om mig</span>
					<p id="profile-bio">{this.state.opponent.bio}</p>
					<ul id="user-social-media">
					<li><i className="fa fa-facebook"></i></li>
					<li><i className="fa fa-twitter"></i></li>
					<li><i className="fa fa-instagram"></i></li>
					<li><i className="fa fa-google-plus"></i></li>
					</ul>
				</div>
				</div>)
	}
}

module.exports = userProfile;
