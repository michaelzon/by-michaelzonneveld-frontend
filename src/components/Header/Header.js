import React from 'react';
import './header.css';
import {Link} from "react-router-dom";

export default function Header() {
    return (
        <div className={'header'}>
            <div className={'logo-container'}>
                <div className={'logo'}><span className={'logo--text'}>mfz</span></div>
            </div>
            <div className={'nav-items'}>
                <div className={'link-and-icon'}>
                    <Link to={'/'}>lastfm</Link>
                    <div className={'logo-wrapper'}>
                        <img src={'/logos/lastfm-mark.svg'} alt={'lastfm-mark'}/>
                    </div>
                </div>
                <div className={'link-and-icon'}>
                    <Link to={'/'}>linkedin</Link>
                    <div className={'logo-wrapper'}>
                        <img src={'/logos/linkedin-mark.svg'} alt={'linkedin-mark'}/>
                    </div>
                </div>
                <div className={'link-and-icon'}>
                    <Link to={'/'}>github</Link>
                    <div className={'logo-wrapper'}>
                        <img src={'/logos/github-mark.svg'} alt={'github-mark'}/>
                    </div>
                </div>

            </div>
        </div>
    )
}