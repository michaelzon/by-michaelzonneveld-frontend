import '../Experience.css';
import React from "react";
import Item from './Item';
export default function OtherActivities() {

    const items = [
        {
            period: '09/2016 – 07/2017',
            definition: 'Member of the Study Committee Mercurius at University of Amsterdam.'
        },
        {
            period: '09/2015 – 07/2016',
            definition: 'Board member education committee at Amsterdam University of Applied Science..'
        },
        {
            period: '09/2014 – 07/2015',
            definition: 'Class chairman at The Hague University of Applied Science.'
        }
    ];

    return (
        <div className={'other-activities'}>
            <h2> Other Activities </h2>
            {items.map((item, index) => (
                <Item
                    key={index}
                    period={item.period}
                    definition={item.definition}
                />
            ))}
        </div>
    )
}