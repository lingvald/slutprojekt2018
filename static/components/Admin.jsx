import React, { Component } from 'react';
import axios from 'axios';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
      users: []
    }}

    deleteUsers(e){
      const userId = '/delete/users/' + e.target.value
      axios.delete(userId)
        .then(result => {
        console.log(result)
      });
      axios.get('/api/users' )
        .then(result => {
        const allUsers = result.data;
        this.setState({users: allUsers});
      });
    }

    componentDidMount(){
      axios.get('/api/users' )
        .then(result => {
        const allUsers = result.data;
        this.setState({users: allUsers});
      });
    }
    render() {
        return (
            <div id="allUsers">
              <ul>
                {this.state.users.map(user => <li className="users" key={user._id}>
                <p>{user.username}</p>
                <button className="deleteUsers" value={user._id} onClick={e => this.deleteUsers(e)}>X</button>
              </li>)}
              </ul>
            </div>
        );
    }
}

export default Admin;
