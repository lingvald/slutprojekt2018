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
            return <li id="" key={value._id}><div id="groupChattMessage"><img src={value.imgUrl}></img>{' ' + value.message}</div>{ ' ' + '-' + ' ' + value.username}</li>
          })}
        </ul>
      </div>
      <div id="submitFlex">
        <input id="submitText" onChange={event => this.setState({text: event.target.value})}></input>
        <div id="test">
          <div className="popupContainer">
            <span className="popupContent" id="popupContent">
              <span>Skicka en bild!</span>
              <input id="submitImg" placeholder="Bildadress, Url" onChange={event => this.setState({imgUrl: event.target.value})}></input>
            </span>
          </div>
          <div id="imgIcon" onClick={() => document.getElementById("popupContent").classList.toggle("show")}><i className="fa fa-image"></i></div>
        </div>
        <button id="submitButton" onClick={() => this.submitMessage()}>Submit</button>
      </div>
    </div>
  }
  scrollToBotom(){
    () => {document.getElementById('textArea').scrollTop = document.getElementById('textArea').scrollHeight;};
   }
  componentDidMount() {
    axios.get('/home/isloggedin').then(result => {
      var isLoggedInName = result.data;
      this.setState({isLoggedIn: isLoggedInName});
    });
// setInterval(function(){
    axios.get('api/allconversations')
		.then(result => {
      console.log(result)
			var chat = result.data;
			this.setState({chats: chat});
		});
    //scrollar längst ner i gruppchatten när sidan laddas in
    setTimeout(this.scrollToBotom(), 10000);
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
      this.scrollToBotom();
  }
}

module.exports = GroupChatt;
