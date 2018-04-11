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
  render() {
    return <div id="groupChatt">
      <h1>{this.state.isLoggedIn.username}</h1>
      <input className={"img"} onChange={event => {this.setState({imgUrl: event.target.value})} }></input>
      <input onChange={event => {this.setState({ text: event.target.value})} }></input>

      <button onClick={() => this.submitMessage()}>Submit</button>

      <ul>
        {this.state.chats.map(function (value) {
          return <li key={value._id}>{value.message + ' ' }<img src={value.imgUrl}></img>{'from' + ' ' + value.username}</li>
        })}
      </ul>
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
