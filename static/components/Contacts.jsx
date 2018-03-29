var React = require('react');
var axios = require('axios');

class Contacts extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
			users: [],
			isLoggedIn: ''
		};
	}

	componentDidMount(){
		axios.get('/api/users')
		.then(result => {
		var usernames = result.data.map(user => user);
		this.setState({users: usernames});

	});
		axios.get('/home/isloggedin')
		.then(result => {
		var isLoggedInName = result.data;
		this.setState({isLoggedIn: isLoggedInName});
	});
	}
	render(){
		return (<div>
			<nav id="app-nav">
			<h2>Välkommen tillbaka, {this.state.isLoggedIn.username}!</h2>
			<span><a href="/logout"><i className="fa fa-sign-out"></i></a></span>
			</nav>
			<div id="contacts-container">
				<div id="user-container">
				<div id="user-profile">
				<form method="POST" action="/userinfo">
				<input id="name" value={this.state.isLoggedIn.username} name="identifier" type="text"/>
					<label htmlFor="bio">Bio</label>
					<textarea required id="bio" name="userbio"></textarea>
					<label htmlFor="image">Bildadress</label>
					<input required name="image" id="image" type="text"/>
					<label htmlFor="age">Ålder</label>
					<input required name="age" id="age" type="number"/>
					<label htmlFor="city">Stad</label>
					<input required name="city" id="city" type="text"/>
					<input type="submit"/>
				</form>
				</div>
				<div id="myInfo">
				<div>
					<h3 id="myInfo-heading">{this.state.isLoggedIn.username}s Profil</h3>
					<div id="profile-image" style={{backgroundImage: 'url(' + this.state.isLoggedIn.image + ')'}}></div>
					<span className="profile-headings">Ålder</span>
					<p id="profile-age">{this.state.isLoggedIn.age} år</p>
					<span className="profile-headings">Stad</span>
					<p id="profile-city">{this.state.isLoggedIn.city}</p>
					<span className="profile-headings">Om mig</span>
					<p id="profile-bio">{this.state.isLoggedIn.bio}</p>
					<ul id="user-social-media">
					<li><i className="fa fa-facebook"></i></li>
					<li><i className="fa fa-twitter"></i></li>
					<li><i className="fa fa-instagram"></i></li>
					<li><i className="fa fa-google-plus"></i></li>
					</ul>
				</div>
				</div>
			</div>
				<div id="chatroom-container">

				</div>
					<div id="contact-list">
				<h2 id="contact-list-heading">Kontakter</h2>
				<ul>
				{
					this.state.users.map(contactName =>
						<li key={contactName.username}><a onClick={function(){/*location.reload()*/}} href={"#/" + contactName.username}>{contactName.username}</a> <div id="contact-list-image" style={{backgroundImage: 'url(' + contactName.image + ')'}}></div></li>
					)
				}
				</ul>
				<a id="logout" href="/logout">Logga ut</a>
			</div>
			</div>
			</div>
		)
	}
}

module.exports = Contacts;
