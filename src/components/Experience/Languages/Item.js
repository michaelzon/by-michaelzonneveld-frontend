import '../Experience.css';
import PropTypes from 'prop-types';
import React from "react";

Item.propTypes = {
    language: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
}

export default function Item({language, level}) {

    return (
        <div className={'experience-item'}>
            <span> {language} </span>
            <span> {level} </span>
        </div>
    )
}