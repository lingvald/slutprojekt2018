import React, { Component } from 'react';
import axios from 'axios';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: [],
            imgUrl: '',
			isLoggedIn: '',
			opponent: '',
        };
        this.submitMessage = this.submitMessage.bind(this);
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
        imgUrl: this.state.imgUrl,
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


    render() {
		const username = this.state.isLoggedIn.username;
        return (
            <div className="chatroom">
                <h3><span>{this.state.opponent.username}</span><div className="opponent-image" style={{backgroundImage: 'url(' + this.state.opponent.image + ')'}}></div></h3>
				<ul className="chats" ref={(c) => { this.chats = c; }}>
                    {

                        this.state.chats.map(chat =>
						<li key={chat._id} className={`chat ${username === chat.opponent ? "left" : "right"}`}>
              <img src={chat.imgUrl}></img>
						<p className="messages">{chat.message}</p>
                       </li>
                        )

                    }
                </ul>
                <form className="input" onSubmit={(e) => this.submitMessage(e)}>
					<input type="text" ref={(input) => { this.msg = input; }} />
            <div id="test2">
              <div className="popupContainer">
                <span className="popupContent" id="popupContentChatt">
                  <span>Skicka en bild!</span>
                  <input id="submitImg" placeholder="Bildadress, Url" onChange={event => this.setState({imgUrl: event.target.value})}></input>
                </span>
              </div>
					<div onClick={() => document.getElementById("popupContentChatt").classList.toggle("show")} id="message-image"><i className="fa fa-image"></i></div>
          </div>
                    <input type="submit" value="skicka" />
                </form>
            </div>
        );
    }
}

export default Chat;
