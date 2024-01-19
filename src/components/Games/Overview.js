import React from 'react';
import './overview.css';
import {Link, useParams} from "react-router-dom";

export default function Overview() {

    return (
        <div className='games-overview'>
            <Link to={`/games/lingo`}>
                <p> lingo </p>
            </Link>
        </div>
    );
};