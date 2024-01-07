import '../Experience.css';
import React from "react";
import Item from './Item';
import { v4 as uuidv4 } from 'uuid';
export default function SkillsAndTechnologies() {

    const items = [
        {
            definition: 'Languages',
            elements: ['PHP', 'JavaScript', 'TypeScript']
        },
        {
            definition: 'Technologies & Tools',
            elements: ['HTML', 'CSS', 'SASS']
        },
        {
            definition: 'Other',
            elements: ['User Experience']
        }
    ];

    return (
        <div className={'skills-and-technologies'}>
            {items.map(item => (
                <Item
                    key={uuidv4()}
                    definition={item.definition}
                    elements={item.elements}
                />
            ))}
        </div>
    )
}