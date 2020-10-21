import React from 'react';
import chat from '../../css/room.module.css';

const ChatBox = (props) => {
    return (
        <div className={chat.chat_container}>
            <h4 className={chat.h4}>Chat</h4>
            <hr className={chat.hr}/>
            <div className={chat.chat}>
                <ul ></ul>
            </div>
        </div>
    )
}

export default ChatBox;