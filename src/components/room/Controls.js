import React from 'react';
import controls from '../../css/room.module.css';
import Icon from '../home/Icon';

class Controls extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props);
        this.myStream = this.props.stream;
        console.log("in controls",this.myStream)

    }

    render() {
        return (
            <div className={controls.controls_container}>
                <div className={controls.gap} />
                <Icon main={controls.icon} iname="fas fa-microphone" text="Mute" ctext={controls.h3} />
                <Icon main={controls.icon} iname="fas fa-video" text="Stop" ctext={controls.h3} />
                <div className={controls.gap} />
                <Icon main={controls.icon} iname="fas fa-sign-out-alt" text="Leave" ctext={controls.h3} />
            </div>
        )
    }
}

export default Controls;