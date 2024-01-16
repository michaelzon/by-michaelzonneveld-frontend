import './item.css';
import PropTypes from 'prop-types';
import React from "react";

Item.propTypes = {
    definition: PropTypes.string.isRequired,
    elements: PropTypes.array.isRequired,
}

export default function Item({definition, elements}) {

    return (
        <div className={'skills-and-technologies-item'}>
            <div className={'skills-and-technologies-definition'}>
                <h3> {definition} </h3>
            </div>
            <div className='skills-and-technologies-elements'>
                {elements.map((element, index) => (
                    <div key={index} id={`${index}-${element}`} className={'skills-and-technologies-element'}>
                        <span> {element} </span>
                    </div>
                ))}
            </div>
        </div>
    )
}