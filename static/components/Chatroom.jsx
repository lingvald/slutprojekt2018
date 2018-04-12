import React, { Component } from 'react';
import axios from 'axios';
import Chat from './Chat.jsx';

import UpdateProfile from './Update_profile.jsx';

class Chatroom extends Component {
    constructor(props) {
		super(props);
		this.state = {
			users: [],
			isLoggedIn: '',
			showChat: true,
            showUpdateProfile: false
		};
	this.toggleChat = this.toggleChat.bind(this);
    this.toggleUpdateProfile = this.toggleUpdateProfile.bind(this);
	}

	componentDidMount(){
		axios.get('/api/users')
			.then(result => {
			const usernames = result.data.map(user => user);
			this.setState({users: usernames});
		});
		axios.get('/home/isloggedin')
			.then(result => {
			const isLoggedInName = result.data;
			this.setState({isLoggedIn: isLoggedInName});
		});
	}

	toggleChat() {
		this.setState({showChat: false});
		setTimeout(() => {
			this.setState({showChat: true});
		}, 1);
		}

    toggleUpdateProfile() {
        const { showUpdateProfile } = this.state;
        this.setState({showUpdateProfile:!showUpdateProfile});
    }

	render(){
		return (
			<div>
			<nav id="app-nav">
			<h2>Välkommen {this.state.isLoggedIn.username}!</h2>
			<span><a href="/logout"><i className="fa fa-sign-out"></i></a></span>
			</nav>
			<div id="contacts-container">
				<div id="user-container">
				<div id="myInfo">
				<div>

					<h3 id="myInfo-heading">{this.state.isLoggedIn.username} <i onClick={this.toggleUpdateProfile} className="fa fa-edit"></i></h3>
				    <div id="myInfo-col">

					    <div id="profile-image" style={{backgroundImage: 'url(' + this.state.isLoggedIn.image + ')'}}></div>
					    <div id="profile-info">
					        <span className="profile-headings">Ålder</span>
					        <p id="profile-age">{this.state.isLoggedIn.age} år</p>
					        <span className="profile-headings">Stad</span>
					        <p id="profile-city">{this.state.isLoggedIn.city}</p>
					        <span className="profile-headings">Kön</span>
					        <p id="profile-city">{this.state.isLoggedIn.sex}</p>
					        <span className="profile-headings">Om mig</span>
					        <p id="profile-bio">{this.state.isLoggedIn.bio}</p>
				    	</div>
				    </div>


					<ul id="user-social-media">
					<li><i className="fa fa-facebook"></i></li>
					<li><i className="fa fa-twitter"></i></li>
					<li><i className="fa fa-instagram"></i></li>
					<li><i className="fa fa-google-plus"></i></li>
					</ul>
				</div>
				</div>
			</div>
			{ this.state.showUpdateProfile && <UpdateProfile /> }

				<div id="chatroom-container">
					{ this.state.showChat && <Chat selectedUser={location.hash.replace('#/', '')} /> }
				</div>
					<div id="contact-list">
				<h2 id="contact-list-heading">Kontakter</h2>
				<ul>
				{
					this.state.users.map(contactName =>
										<li onClick={this.toggleChat} key={contactName.username}><a id="contact-anchor-tag" href={"#/" + contactName.username} >{contactName.username} <i className="fa fa-comments"></i></a> <div id="contact-list-image" style={{backgroundImage: 'url(' + contactName.image + ')'}}></div></li>
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

export default Chatroom;
