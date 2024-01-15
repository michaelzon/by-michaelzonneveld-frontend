import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
    return (
        <div className='footer'>
            <Link to='/contact'>Contact</Link>
        </div>
    );
}
