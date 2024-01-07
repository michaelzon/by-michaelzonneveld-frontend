import '../Experience.css';
import PropTypes from 'prop-types';
import React from "react";

Item.propTypes = {
    definition: PropTypes.string.isRequired,
    elements: PropTypes.array.isRequired,
}

export default function Item({definition, elements}) {

    return (
        <div className={'experience-item'}>
            <span> {definition} </span>
            {elements.map((element, index) => (
                <span key={index} id={`${index}-${element}`}> {element} </span>
            ))};
        </div>
    )
}