var React = require('react');
var ReactDOM = require('react-dom');
var axios = require('axios');

class Chatroom extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			chats: [],
			isLoggedIn: '',
			opponent: ''
		};
		this.submitMessage = this.submitMessage.bind(this);
	}


	whoIsLoggedIn(){
		axios.get('/home/isloggedin')
			.then(result => {
			var isLoggedInName = result.data;
			this.setState({isLoggedIn: isLoggedInName});
			this.whoIsLoggedIn();
		});
	}

	componentDidMount() {
		console.log(this.props);
		axios.get('/api/users/' + this.props.selectedUser)
			.then(result => {
			var currentOpponent = result.data;
			this.setState({opponent: currentOpponent[0]});
		});

		axios.get('/api/conversations/' + this.props.selectedUser)
			.then(result => {
			var chat = result.data;
			this.setState({chats: chat});
			console.log(this.state.chats);
		});


	}

	componentDidUpdate() {
		this.scrollToBot();
	}

	scrollToBot() {
		ReactDOM.findDOMNode(this.chats).scrollTop = ReactDOM.findDOMNode(this.chats).scrollHeight;
	}

	submitMessage(e) {
		if(ReactDOM.findDOMNode(this.msg).value !== ''){
			e.preventDefault();
			var message = ReactDOM.findDOMNode(this.msg).value;
			axios.post('/conversations', {
				username: this.state.isLoggedIn.username,
				user_id: this.state.isLoggedIn._id,
				message: message,
				opponent: this.state.opponent.username
			})
				.then(function (response) {
				console.log(response);
			})
				.catch(function (error) {
				console.log(error);
			});

			this.setState({
				chats: this.state.chats.concat([{
					username: this.state.isLoggedIn.username,
					message: <p>{ReactDOM.findDOMNode(this.msg).value}</p>
				}])
			}, () => {
				ReactDOM.findDOMNode(this.msg).value = "";
			});
			this.scrollToBot();
		} else {
			console.log('hmm');
		}
	}
	render() {
		var username = this.state.isLoggedIn.username;
		console.log(username);
		/*        var { chats } = this.state;*/
		return (
			<div className="chatroom">
			<h3><span>{this.props.selectedUser}</span><div className="opponent-image" style={{backgroundImage: 'url(' + this.state.opponent.image + ')'}}></div></h3>
			<ul className="chats" ref={(c) => { this.chats = c; }}>
			{

			this.state.chats.map(chat =>
			<li key={chat._id} className={`chat ${username === chat.opponent ? "right" : "left"}`}>
<p className="messages">{chat.message}</p>
</li>
)

}
</ul>
<form className="input" onSubmit={(e) => this.submitMessage(e)}>
<input type="text" ref={(input) => { this.msg = input; }} />
<input type="submit" value="skicka" />
</form>
</div>
);
}
}

module.exports = Chatroom;
