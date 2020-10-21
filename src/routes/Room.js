import React from 'react';
import { Redirect } from 'react-router-dom';
import VideoGrid from '../components/room/VideoGrid';
import Controls from '../components/room/Controls';
import ChatBox from '../components/room/ChatBox';
import Message from '../components/room/Message';
import room from '../css/room.module.css';
import { getMedia, addVideoStream } from '../handler/callHandler';
import { socket } from '../socketController';
import Peer from 'peerjs';

class Room extends React.Component {
    constructor(props) {
        super(props);
        this.peers = {};
        this.myvideostream = null;
        this.peer = null;
        this.RoomId = this.props.location.RoomiId;
        this.pathname = this.props.location.pathname;
        this.isAllow = this.props.location.isAllow;
        this.state = { video: 0 }
    }


    componentDidMount() {
        this.peer = new Peer(undefined, {
            path: '/peerjs',
            host: 'localhost',
            port: 8080,
        });

        this.setState({ video: document.querySelectorAll('video').length })
        const grid = document.getElementById('video-grid');
        getMedia.then((stream) => {
            this.myvideostream = stream;
            const video = document.createElement('video');
            video.poster = "../images/homebg.jpg";
            video.muted = true;
            addVideoStream(grid, video, stream);
        });

        this.peer.on('open', userId => {
            console.log(this.RoomId)
            socket.emit('join-room', this.RoomId, userId);
            console.log("socket join peer on")
        });

        socket.on('new user', userId => {
            console.log("new user")
            getMedia.then((stream) => {
                this.myvideostream = stream;
                const call = this.peer.call(userId, stream);
                const video = document.createElement('video');
                video.poster = "/images/profile.jpg";
                call.on('stream', (userVideoStream) => {
                    addVideoStream(grid, video, userVideoStream);
                });
                call.on('close', () => {
                    video.remove();
                })
                this.peers[userId] = call;
            });
        });

        this.peer.on('call', (call) => {
            getMedia.then(stream => {
                call.answer(stream);
                const video = document.createElement('video');
                video.poster = "/images/profile.jpg";
                call.on('stream', (userVideoStream) => {
                    addVideoStream(grid, video, userVideoStream);
                });
            });
        });

        
    }

    render() {
        if (this.isAllow) {
            return (
                <div className={room.container}>
                    <VideoGrid room={room} />
                    <ChatBox room={room} />
                    <Controls room={room} stream={this.myvideostream}/>
                    <Message room={room} />
                </div>
            )
        } else return <Redirect to={{ pathname: "/meeting", room: this.pathname }} />
    }
}

export default Room;