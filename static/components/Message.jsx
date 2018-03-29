var React = require('react');

var Message = ({chat, user}) => (
    <li className={`chat ${user === chat.opponent ? "right" : "left"}`}>
        {user !== chat.username}
        {chat.message}
    </li>
);

module.exports = Message;
