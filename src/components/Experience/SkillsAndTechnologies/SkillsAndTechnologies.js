import '../Experience.css';
import React from "react";
import Item from './Item';
export default function SkillsAndTechnologies() {

    const items = [
        {
            definition: 'Languages',
            elements: ['PHP', 'JavaScript', 'TypeScript']
        },
        {
            definition: 'Technologies & Tools',
            elements: ['HTML', 'CSS', 'SCSS', 'React', 'Laravel', 'Git', 'JSON', 'MySQL', 'Next.js', 'TailWind CSS', 'SPSS', 'Microsoft Office (Word, PowerPoint, Excel)']
        },
        {
            definition: 'Other',
            elements: ['User Experience', 'Object-Oriented Programming (OOP)', 'Databases', ' (Automatic) Content Analysis', 'Data Processing', 'Media Analysis', 'Customer Relation Management', 'Sales']
        }
    ];

    return (
        <div className={'skills-and-technologies'}>
            <h2> Skills and Technologies </h2>
            {items.map((item, index) => (
                <Item
                    key={index}
                    definition={item.definition}
                    elements={item.elements}
                />
            ))}
        </div>
    )
}