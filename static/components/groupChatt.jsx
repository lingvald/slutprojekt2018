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
            return <li id="" key={value._id}><span id="groupChattMessage">{value.message}<img src={value.imgUrl}></img></span>{ ' ' + '-' + ' ' + value.username}</li>
          })}
        </ul>
      </div>
      <div id="submitFlex">
        <input id="submitText" onChange={event => this.setState({text: event.target.value})}></input>
        <div id="test">
          <div className="popupContainer">
            <span className="popupContent" id="popupContent">
              <p>Skicka en bild!</p>
              <input id="submitImg" onChange={event => this.setState({imgUrl: event.target.value})}></input>
            </span>
          </div>
          <img id="imgIcon" src="https://i0.wp.com/www.freeiconspng.com/uploads/no-image-icon-13.png?resize=601%2C476" onClick={() => document.getElementById("popupContent").classList.toggle("show")}></img>
        </div>
        <button id="submitButton" onClick={() => this.submitMessage()}>Submit</button>
      </div>
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
    //scrollar längst ner i gruppchatten när sidan laddas in
    setTimeout(() => {
      var bottom = document.getElementById('textArea').scrollHeight - document.getElementById('textArea').scrollTop;
      document.getElementById('textArea').scrollBy(0, bottom)
    }, 1500)
  }
  submitMessage() {
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
