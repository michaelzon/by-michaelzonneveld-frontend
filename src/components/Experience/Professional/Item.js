import '../Experience.css';
import PropTypes from 'prop-types';

Item.propTypes = {
    organisation: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    period: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
}

export default function Item({role, organisation, location, period, description}) {

    return (
        <div className={'experience-item'}>
            <span> {role} </span>
            <span> {organisation} </span>
            <span> {location}</span>
            <span> {period} </span>
            <span> {description} </span>
        </div>
    )
}