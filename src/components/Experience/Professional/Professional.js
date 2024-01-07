import '../Experience.css';
import Item from "./Item";
import React from "react";

export default function Professional() {

    const professionalExperienceItems = [
        {
            id: 1,
            category: 'professional',
            role: 'jr. developer1',
            location: 'amsterdam',
            organisation: 'some organisation',
            period: '1-1-2019 - 31-12-2021',
            description: 'was fun'
        },
        {
            id: 2,
            category: 'professional',
            role: 'jr. developer2',
            location: 'amsterdam',
            organisation: 'some organisation2',
            period: '1-1-2022 - 31-12-2023',
            description: 'was fun too !!    '
        }
    ];

    return (
        <div className={'professional'}>
            {professionalExperienceItems.map(item => (
                <Item
                    key={item.id}
                    role={item.role}
                    organisation={item.organisation}
                    location={item.location}
                    period={item.period}
                    description={item.description}
                />
            ))}
        </div>
    )
}