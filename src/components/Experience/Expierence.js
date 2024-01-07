import React from 'react';
import './Experience.css';
import Professional from "./Professional/Professional";
import Education from "./Education/Education";
import SkillsAndTechnologies from "./SkillsAndTechnologies/SkillsAndTechnologies";

export default function Experience() {
    return (
        <div className='experience'>
            <Professional/>
            <Education/>
            <SkillsAndTechnologies/>
            <ProjectsAndExtra/>
        </div>
    );
};