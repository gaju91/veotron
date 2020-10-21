import React from 'react';
import $ from 'jquery';
import meeting from '../css/meeting.module.css';
import home from '../css/home.module.css';
import axios from 'axios';
import Icon from '../components/home/Icon';
import { join } from '../socketController';
import { Redirect } from 'react-router-dom';

class Meeting extends React.Component {
    constructor(props) {
        super(props);

        this.state = { redirect : null}
        this.host = props.location.isHost;
        this.shareLink = this.shareLink.bind(this);
        this.goToMeet = this.goToMeet.bind(this);
        this.joinMeet = this.joinMeet.bind(this);
    }

    shareLink() {
        $("input[type='text']").on("click", function () {
            $(this).select();
        });
    }

    goToMeet() {
        this.setState({ redirect:"/room" } , () => {
            console.log(this.state.redirect);
        });
    }

    joinMeet() {
        this.roomid = $('#roomId').val();
        this.goToMeet();
    }

    componentWillMount() {
        if (this.host) {
            axios.get("http://localhost:8080/")
                .then((res) => {
                    $('#roomId').val(res.data.slice(1));
                    this.roomid = $('#roomId').val();
                })
        }
    }

    componentDidMount() {
        console.log(this.props.location);
        if (this.props.location.room) {
            this.roomid = this.props.location.room;
            $('#roomId').val(this.roomid.slice(9));
        }
    }


    render() {
        if(this.state.redirect) {
            console.log("in redirect",this.state.redirect)
            return <Redirect to={{pathname : this.state.redirect ,RoomiId : this.roomid, isAllow : true}} />
        } 

        else if (this.host) {
            return (
                <div className={meeting.container}>
                    <h2 className={meeting.header}>Share Room</h2>
                    <input id="roomId" type="text" className={meeting.input} onClick={this.shareLink} readOnly />

                    <div className={meeting.icon_wrapper}>
                        <Icon id="share" main={home.icon} iname="fas fa-share"
                            ctext={home.h3} text="Share" />
                        <Icon id="start" main={home.icon} iname="fas fa-sign-in-alt" func={this.goToMeet}
                            ctext={home.h3} text="Start"
                        />
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className={meeting.container}>
                    <h2 className={meeting.header}>Join Room</h2>
                    <input id="roomId" type="text" className={meeting.input} />

                    <div className={meeting.icon_wrapper}>

                        <Icon id="share" main={home.icon} iname="fas fa-sign-in-alt" func={this.joinMeet}
                            ctext={home.h3} text="Join" />
                        <Icon id="start" main={home.icon} iname="fas fa-glass-cheers"
                            ctext={home.h3} text="New Meeting" route={'/'} />

                    </div>
                </div>
            )
        }
    }
}

export default Meeting;