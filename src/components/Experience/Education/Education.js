import '../Experience.css';
import Item from "./Item";
import React from "react";

export default function Education() {

    const items = [
        {
            id: 3,
            category: 'educational',
            organisation: 'uva',
            location: 'amsterdam',
            program: 'communication science',
            period: '1-1-2017 - 31-12-2019',
            description: 'there were mostly women'
        }
    ];

    return (
        <div className={'educational'}>
            {items.map(item => (
                <Item
                    key={item.id}
                    program={item.program}
                    organisation={item.organisation}
                    location={item.location}
                    period={item.period}
                    description={item.description}
                />
            ))}
        </div>
    )
}

