import React, { Component } from 'react';
import Chatroom from './Chatroom.jsx';
import GroupChatt from './groupChatt.jsx';

// Making the App component
class App extends Component {
	constructor() {
		super()

	}
	render(){
		return (
        <div className="App">
			<Chatroom />
			<GroupChatt />
		</div>
		)
	}
}

export default App;
