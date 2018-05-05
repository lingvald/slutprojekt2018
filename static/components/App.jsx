import React, { Component } from 'react';
import axios from 'axios';
import Chatroom from './Chatroom.jsx';
import GroupChatt from './groupChatt.jsx';
import Admin from './Admin.jsx'

// Making the App component
class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
		isLoggedIn: '',
		};
	}

	whoIsLoggedIn(){
		axios.get('/home/isloggedin')
			.then(result => {
			const isLoggedInName = result.data;
			this.setState({isLoggedIn: isLoggedInName});
		});
	}

componentDidMount(){
		this.whoIsLoggedIn();
}
	render(){
		const username = this.state.isLoggedIn.username;
		return (
        <div className="App">
					<Chatroom />
					<GroupChatt />
					{username === 'admin' || username === 'Admin' ? <Admin />:('')}
		</div>
		)
	}
}

export default App;
