import '../Experience.css';
import Item from "./Item";
import React from "react";

export default function Education() {

    const items = [
        {
            organisation: 'University of Amsterdam',
            program: 'MSc Information Studies: Information Systems',
            period: '09/2020 - 01/2022',
            description: 'Thesis project: analyzed Twitter data with Python between companies and customers to advise how to improve public engagement. | GPA: 7.4/10'
        },
        {
            organisation: 'University of Amsterdam.',
            program: 'BSc Communication Science',
            period: '09/2016 - 07/2019',
            description: 'Did my thesis on media populism while using automatic content analysis (using Python) to study people-centrism in Dutch newspapers | GPA: 7.5/10.'
        },
        {
            organisation: 'University of Amsterdam.',
            program: 'Minor Programming',
            period: '02/2018 – 06/2018',
            description: 'Python, Javascript, D3.js, HTML, CSS. Final project: visualizing data on the current state of political trust in the Netherlands.'
        },
        {
            organisation: 'Amsterdam University of Applied Science',
            program: 'Commercial Economics',
            period: '09/2015 – 07/2016',
            description: 'Specialization in marketing and sales.'
        },
        {
            organisation: 'The Hague University of Applied Science',
            program: 'Commercial Economics',
            period: '09/2014 – 07/2015',
            description: 'Received my propedeutics'
        },
        {
            organisation: 'Lyceum Sancta Maria Haarlem.',
            program: 'HAVO',
            period: '09/2007 – 07/2013',
            description: 'Profiel: Economie en Maatschappij'
        },
    ];

    return (
        <div className={'educational'}>
            <h2> Education </h2>
            {items.map((item, index) => (
                <Item
                    key={index}
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

