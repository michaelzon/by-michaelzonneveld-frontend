import React from 'react';
import './experience.css';
import Professional from "./Professional/Professional";
import Education from "./Education/Education";
import SkillsAndTechnologies from "./SkillsAndTechnologies/SkillsAndTechnologies";
import OtherActivities from "./OtherActivities/OtherActivities";
import Languages from "./Languages/Languages";

export default function Experience() {
    return (
        <div className='experience'>
            <Professional/>
            <Education/>
            <SkillsAndTechnologies/>
            <OtherActivities/>
            <Languages/>
        </div>
    );
};