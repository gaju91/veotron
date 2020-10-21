import React from 'react';
import { Link } from 'react-router-dom'

const Icon = (props) => {
    return (
        <div className={props.main} onClick={props.func} >
            <Link to={props.route} ><i className={props.iname}></i></Link>
            <br />
            <h3 className={props.ctext}>{props.text}</h3>
        </div>
    )
}

export default Icon;