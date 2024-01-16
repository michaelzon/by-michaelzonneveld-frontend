import '../experience.css';
import Item from "./Item";
import React from "react";

export default function Languages() {

    const items = [
        {
            language: 'dutch',
            level: 'Native Proficiency',
        },
        {
            language: 'english',
            level: 'Professional Proficiency',
        }
    ];

    return (
        <div className={'languages'}>
            <h2> Languages </h2>
            {items.map((item, index) => (
                <Item
                    key={index}
                    language={item.language}
                    level={item.level}
                />
            ))}
        </div>
    )
}