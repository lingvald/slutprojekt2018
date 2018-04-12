import React, { Component } from 'react';
import Chatroom from './Chatroom.jsx';

// Making the App component
class App extends Component {
	constructor() {
		super()

	}
	render(){
		return (
        <div className="App">
			<Chatroom />
		</div>
		)
	}
}

export default App;
