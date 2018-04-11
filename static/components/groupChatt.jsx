var React = require('react');
var axios = require('axios');

class GroupChatt extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoggedIn: '',
      text: '',
      chats: [],
      imgUrl: ''
    }
  }
  //this.state.isLoggedIn.username
  render() {
    return <div id="groupChatt">
      <h2 id="contact-list-heading" >Group Chatt</h2>
      <div id="textArea">
        <ul>
          {this.state.chats.map(function (value) {
            return <li id="" key={value._id}><span id="groupChattMessage">{value.message}</span>{ ' ' + '-' + ' ' + value.username}</li>
          })}
        </ul>
      </div>
        <input id="submitText" onChange={event => this.setState({text: event.target.value})}></input>

        <button id="submitButton" onClick={() => this.submitMessage()}>Submit</button>

    </div>
  }
  componentDidMount() {
    axios.get('/home/isloggedin').then(result => {
      var isLoggedInName = result.data;
      this.setState({isLoggedIn: isLoggedInName});
    });

    axios.get('/api/conversations/' + 'toAll')
		.then(result => {
			var chat = result.data;
      console.log(chat);
			this.setState({chats: chat});
		});
  }
  submitMessage() {
console.log(this.state);
    axios.post('/conversations', {
				username: this.state.isLoggedIn.username,
				user_id: this.state.isLoggedIn._id,
				message: this.state.text,
        imgUrl: this.state.imgUrl,
				opponent: 'toAll'
			})
				.then(function (response) {
				console.log(response);
			})
				.catch(function (error) {
				console.log(error);
			});
  }
}

module.exports = GroupChatt;
