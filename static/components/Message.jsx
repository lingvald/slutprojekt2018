import React from 'react';

var Message = ({chat, user}) => (
    <li className={`chat ${user === chat.opponent ? "right" : "left"}`}>
        {user !== chat.username}
        {chat.message}
    </li>
);

export default Message;
