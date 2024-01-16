import '../experience.css';
import Item from "./Item";
import React from "react";

export default function Professional() {

    const professionalExperienceItems = [
        {
            role: 'Junior Developer',
            location: 'Maarssen',
            organisation: 'Piggy',
            period: '03/2022 - current',
            description: 'Worked on the business dashboard, company website, the public api and the SDK using tools like MySQL, SCSS, Next.js, TypeScript, Tailwind CSS, React.js, PHP, Laravel and Git.'
        },
        {
            role: 'Student Assistant IT in Education',
            location: 'Amsterdam',
            organisation: 'University of Amsterdam',
            period: '09/2020 - 02/2022',
            description: 'Giving advice regarding IT systems (e.g., Canvas) and external software, ensuring teachers can process information about our online tools with visualizations and information organization.'
        },
        {
            role: 'Support Engineer',
            location: 'Amsterdam',
            organisation: 'De Correspondent',
            period: '06/2019 – 08/2020',
            description: 'Technical assistance, including diagnosing, troubleshoot software/hardware problems (e.g., macOS, GSuite). Implemented an inventory system to realize a structured overview of company belongings for the board. Hardware and software maintenance and investment. Responsible for employee onboarding/offboarding. Set up and videoconferencing software (Zoom) and tools for the whole company.'
        },
        {
            role: 'Editor/Trainee',
            location: 'Amsterdam',
            organisation: 'Publistat',
            period: '12/2018 – 04/2019',
            description: 'Media monitoring for companies in the Dutch financial sector by filtering and interpreting relevant news items. Quantitative and qualitative content analysis and writing reports.'
        },
        {
            role: 'Operations and Customer Service',
            location: 'Haarlemmermeer',
            organisation: 'Tinker Travel',
            period: '07/2016 – 02/2017',
            description: 'Responsible for planning and organizing airport taxi transport door-to-door. Customer support using Zendesk. The link between taxi-driver and customers. Troubleshooting in times of calamity.'
        },
        {
            role: 'Sales Agent',
            location: 'Amsterdam',
            organisation: 'Vandebron',
            period: '11/2015 – 05/2016',
            description: 'Sales, green-energy, improved sales technique regarding intonation and body language.'
        },
        {
            role: 'Contact Agent',
            location: 'Haarlem',
            organisation: '2Contact',
            period: '01/2014 – 01/2015',
            description: 'Career as a telemarketer, worked for Oxxio and XS4ALL. Developed customer-oriented communication skills and advanced sales techniques. Worked with multiple CRM systems.'
        },
    ];

    return (
        <div className={'professional'}>
            <h2> Professional </h2>
            {professionalExperienceItems.map((item, index) => (
                <Item
                    key={index}
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