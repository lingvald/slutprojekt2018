var React = require('react');
var ReactDOM = require('react-dom');
var axios = require('axios');
var emoji = require('node-emoji');
var emojies = Object.values(emoji.emoji);


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
	});
	}

    componentDidMount() {
		this.whoIsLoggedIn();
		axios.get('/api/users/' + this.props.match.params.user)
		.then(result => {
		var currentOpponent = result.data;
		this.setState({opponent: currentOpponent[0]});
	});
		axios.get('/api/conversations/' + this.props.match.params.user)
		.then(result => {
			var chat = result.data;
			this.setState({chats: chat});
		});
    }

    componentDidUpdate() {
		this.scrollToBot();
    }



    scrollToBot() {
        ReactDOM.findDOMNode(this.refs.chats).scrollTop = ReactDOM.findDOMNode(this.refs.chats).scrollHeight;
    }

    submitMessage(e) {
		if(ReactDOM.findDOMNode(this.refs.msg).value !== ''){
        e.preventDefault();
		var message = ReactDOM.findDOMNode(this.refs.msg).value;
		axios.post('/conversations', {
				username: this.state.isLoggedIn.username,
				user_id: this.state.isLoggedIn._id,
				message: message,
				opponent: this.props.match.params.user
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
                message: <p>{ReactDOM.findDOMNode(this.refs.msg).value}</p>
            }])
        }, () => {
            ReactDOM.findDOMNode(this.refs.msg).value = "";
        });
		  this.scrollToBot();
		} else {

		}
    }
    render() {
		const username = this.state.isLoggedIn.username;
        const { chats } = this.state;
        return (
            <div className="chatroom">
                <h3><a onClick={function(){
							document.getElementById('chatroom').style.display = 'none';
						}} href={"#/profil/" + this.props.match.params.user}>{this.props.match.params.user}</a><div className="opponent-image" style={{backgroundImage: 'url(' + this.state.opponent.image + ')'}}></div></h3>
                <ul className="chats" ref="chats">
                    {

                        this.state.chats.map(chat =>
						<li key={chat._id} className={`chat ${username === chat.opponent ? "right" : "left"}`}>
                       		<p className="messages">{chat.message}</p>
                       </li>
                        )

                    }
                </ul>
                <form className="input" onSubmit={(e) => this.submitMessage(e)}>
                    <input type="text" ref="msg" />
                    <input type="submit" value="skicka" />
                </form>
            </div>
        );
    }
}

module.exports = Chatroom;
