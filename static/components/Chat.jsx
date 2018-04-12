import React, { Component } from 'react';
import axios from 'axios';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
			showImageSelector: true,
            chats: [],
			isLoggedIn: '',
			opponent: '',
        };
        this.submitMessage = this.submitMessage.bind(this);
		this.showImageSelectorToggle = this.showImageSelectorToggle.bind(this);
    }

	whoIsLoggedIn(){
		axios.get('/home/isloggedin')
			.then(result => {
			const isLoggedInName = result.data;
			this.setState({isLoggedIn: isLoggedInName});
		});
	}

	componentDidMount() {
			this.whoIsLoggedIn();
		axios.get('/api/users/' + this.props.selectedUser)
			.then(result => {
			const currentOpponent = result.data;
			this.setState({opponent: currentOpponent[0]});

		});

		axios.get('/api/conversations/' + this.props.selectedUser)
			.then(result => {
			const chat = result.data;
			this.setState({chats: chat});
		});
    }

	componentDidUpdate() {
		this.scrollToBot();
    }

    scrollToBot() {
        this.chats.scrollTop = this.chats.scrollHeight;
    }

    submitMessage(e) {
		if (this.msg.value !== '') {
			e.preventDefault();
			const message = this.msg.value;
			axios.post('/conversations', {
				username: this.state.isLoggedIn.username,
				user_id: this.state.isLoggedIn._id,
				message: message,
				opponent: this.state.opponent.username
			})
				.then(function (response) {
				return response
			})
				.catch(function (error) {
				return error
			});

        this.setState({
            chats: this.state.chats.concat([{
                username: this.state.isLoggedIn.username,
                message: <p>{this.msg.value}</p>
            }])
        }, () => {
            this.msg.value = "";
        });
		this.scrollToBot();
		} else {
			console.log('hmm');
		}
    }

	showImageSelectorToggle() {
		const { showImageSelector } = this.state;
		this.setState({showImageSelector:!showImageSelector});
	}

    render() {
		const username = this.state.isLoggedIn.username;
        return (
            <div className="chatroom">
                <h3><span>{this.state.opponent.username}</span><div className="opponent-image" style={{backgroundImage: 'url(' + this.state.opponent.image + ')'}}></div></h3>
				<ul className="chats" ref={(c) => { this.chats = c; }}>
                    {

                        this.state.chats.map(chat =>
						<li key={chat._id} className={`chat ${username === chat.opponent ? "left" : "right"}`}>
						<p className="messages">{chat.message}</p>
                       </li>
                        )

                    }
                </ul>
				{ this.state.showImageSelector && <Image />}
                <form className="input" onSubmit={(e) => this.submitMessage(e)}>
					<input type="text" ref={(input) => { this.msg = input; }} />
					<div onClick={this.showImageSelectorToggle} id="message-image"><i className="fa fa-image"></i></div>
                    <input type="submit" value="skicka" />
                </form>
            </div>
        );
    }
}

class Image extends Component {
	render() {
		return (
			<div id="image-message-container">
				<div style={{backgroundImage: 'url(https://media.istockphoto.com/photos/grey-squirrel-yawning-picture-id473012660?k=6&m=473012660&s=612x612&w=0&h=opzkOsCuudeI_l83My-WdfTiru2mpuwZMpVomymwC9c=)'}}></div>
				<div style={{backgroundImage: 'url(https://media.istockphoto.com/photos/grey-squirrel-yawning-picture-id473012660?k=6&m=473012660&s=612x612&w=0&h=opzkOsCuudeI_l83My-WdfTiru2mpuwZMpVomymwC9c=)'}}></div>
				<div style={{backgroundImage: 'url(https://media.istockphoto.com/photos/grey-squirrel-yawning-picture-id473012660?k=6&m=473012660&s=612x612&w=0&h=opzkOsCuudeI_l83My-WdfTiru2mpuwZMpVomymwC9c=)'}}></div>

			</div>
			)
	}
}

export default Chat;
