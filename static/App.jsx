var React = require('react');
import {Route,NavLink,HashRouter} from "react-router-dom";
var Chatroom = require('./Chatroom.jsx');
var Contacts = require('./Contacts.jsx');
var userProfile = require('./userProfile.jsx');

class App extends React.Component {
	render(){
		return (
		<HashRouter>
		<div>
		<div className="header">
    		<ul>
          	</ul>
          </div>
          <div className="App">
            	<Route path="/profil/:user" component={userProfile}/>
            	<Route path="/:user" component={Chatroom}/>
			</div>
			<Contacts></Contacts>
		</div>
		</HashRouter>
		)
	}
}

module.exports = App;
