import '../experience.css';
import PropTypes from 'prop-types';
import React from "react";

Item.propTypes = {
    period: PropTypes.string.isRequired,
    definition: PropTypes.string.isRequired,
}

export default function Item({period, definition}) {

    return (
        <div className={'experience-item'}>
            <span> {period} </span>
            <span> {definition} </span>
        </div>
    )
}