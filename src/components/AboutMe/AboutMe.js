import React from 'react';
import './about-me.css';

export default function AboutMe() {

    return (
        <div className={'about-me'}>
            <div className={'about-me-description'}>
                <p> Hi! My name is Michael Zonneveld and I'm a proficient and dynamic developer with a proven
                    track record in software development, IT support, and technical assistance. With a solid foundation
                    in both the theoretical and practical aspects of information technology, I have demonstrated
                    exceptional skills in developing and maintaining applications across a broad spectrum of tools and
                    technologies.
                    My knowledge spans MySQL, SCSS, Next.js, HTML5, TypeScript, Tailwind CSS, React.js, PHP, Laravel,
                    and Git.
                </p>
                <p>
                    My career began in customer service and sales, where I honed I started to gain interest in
                    communication,
                    systems and learned the importance of customer-oriented service. Transitioning into the IT sector,
                    I gained significant experience as a Student Assistant IT in Education at the University of
                    Amsterdam,
                    providing technical advice and support for educational systems. This role highlighted my ability to
                    simplify complex technical information, making it accessible to a non-technical audience.
                </p>
                <p>
                    As a Support Engineer at De Correspondent, I demonstrated my problem-solving capabilities and
                    technical proficiency, implementing an inventory system that enhanced the company's operational
                    efficiency. My role as a Junior Full Stack Developer at Piggy further solidified my programming
                    skills, where I contributed to various projects, delivering high-quality, bug-free work that met
                    and exceeded design expectations.
                </p>
                <p>
                    My academic background includes a Master of Science in Information Studies: Information
                    Systems from the University of Amsterdam, where I conducted research on Twitter data analysis
                    to improve public engagement, and a Bachelor of Science in Communication Science, focusing on
                    media populism and content analysis using Python. These experiences have equipped me with a deep
                    understanding of data processing, content analysis, and the intersection between technology and
                    communication.
                </p>
                <p>
                    I am eager to leverage my technical skills and passion for software development to contribute to
                    meaningful projects. I'm enthusiastic about tackling new challenges and have a desire to work in
                    environments that value innovation, teamwork, and a structured approach to problem-solving, making
                    me a valuable asset to any team.</p>

            </div>
            <div className={'portrait'}>
                <img src={'/images/me/Subject.png'} alt={'me'}/>
            </div>
        </div>
    );
};