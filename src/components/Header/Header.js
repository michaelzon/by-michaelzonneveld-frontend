import React from 'react';
import './Header.css';
import {Link} from "react-router-dom";

export default function Header() {
    return (
        <div className={'header'}>
            <div className={'logo-container'}>
                <div className={'logo'}><span className={'logo--text'}>mfz</span></div>
            </div>
                <div className={'nav-items'}>
                    <Link to={''}>lastfm</Link>
                    <Link to={'/'}>linkedin</Link>
                    <Link to={'/'}>github</Link>
                    <Link to={'/'}>contact</Link>
                </div>
        </div>
    )
}