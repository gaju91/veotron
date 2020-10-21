import React from 'react';
import msg from '../../css/room.module.css';

const Message = (props) => {
    return (
        <div className={msg.msg_container}>
            <input id="msg" className={msg.input} />
        </div>
    )
}

export default Message;