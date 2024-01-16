import './item.css';
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
            <div className={'role-and-organisation'}>
                <h3> {role} </h3>
                <h4> {organisation} </h4>
            </div>
            <div className={'professional-period'}>
                <div>
                    <span> {period} </span>
                </div>
            </div>
            <div className={'professional-description'}>
                <span> {description} </span>
            </div>
        </div>
    )
}