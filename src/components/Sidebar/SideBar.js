import React from 'react';
import {Link} from "react-router-dom";
import './Sidebar.css';
export default function Sidebar() {
    return (
        <div className='sidebar'>
            <Link to={''}>home</Link>
            <Link to={'/about-me'}>about me</Link>
            <Link to={'/experience'}>experience</Link>
            <Link to={'/bologna'}>bologna, 2021</Link>
            <Link to={'/morocco'}>morocco, 2022</Link>
        </div>
    )
}