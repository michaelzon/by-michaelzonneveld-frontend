import React from 'react';
import './about-me.css';

export default function AboutMe() {

    return (
        <div className={'about-me'}>
            <div className={'about-me-description'}>
                <span> some text that is about me </span>
            </div>
            <div className={'portrait'}>
                <img src={'/images/me/Subject.png'} alt={'me'}/>
            </div>
        </div>
    );
};