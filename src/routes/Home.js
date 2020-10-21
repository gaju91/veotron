import React from 'react';
import { Link } from 'react-router-dom'
import home from '../css/home.module.css';
import Nav from '../components/home/Nav';
import axios from 'axios';

class Home extends React.Component {
        render() {
        return (
            <div className={home.container}>
                <Nav cname={home} />
                <header className={home.header}>veotron</header>
                <div className={home.button_wrap}>
                    <button onClick={this.meetingCondition}>
                        <Link to={{ pathname: "/meeting", isHost: true }}>Host Meeting</Link>
                    </button>
                    <div className={home.gap}></div>
                    <button>
                        <Link to={{ pathname: "/meeting", isHost: false }}>Join Meeting</Link>
                    </button>
                </div>
            </div>
        )
    }
}

export default Home;