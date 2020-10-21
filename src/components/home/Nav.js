import React from 'react';
import Icon from './Icon';

const Nav = (props) => {
    return (
        <div className={props.cname.nav}>
            <Icon main={props.cname.icon} ctext={props.cname.h3} 
                iname="fas fa-code" text="Code" />

            <Icon main={props.cname.icon} ctext={props.cname.h3} 
                iname="fas fa-user-secret" text="About me"/>
        </div>
    )
}

export default Nav;