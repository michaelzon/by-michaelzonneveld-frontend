import React from 'react';
import './AboutMe.css';

export default function AboutMe() {

    return (
        <div className={'about-me'}>
            <div className={'description'}>
                <span> some text that is about me </span>
            </div>
            <div className={'portrait'}>
                <img src={'/images/me/Subject.png'} alt={'me'}/>
            </div>
        </div>
    );
};