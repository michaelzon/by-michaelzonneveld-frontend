import './item.css';
import PropTypes from 'prop-types';
import React from "react";

Item.propTypes = {
    language: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
}

export default function Item({language, level}) {

    return (
        <div className={'language-item'}>
            <div className={'language-wrapper'}>
                <span className={'language-span'}> {language} </span>
            </div>
            <div className={'level-wrapper'}>
                <span className={'level-span'}> {level} </span>
            </div>
        </div>
    )
}