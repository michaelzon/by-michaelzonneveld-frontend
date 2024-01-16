import './item.css';
import PropTypes from 'prop-types';

Item.propTypes = {
    organisation: PropTypes.string.isRequired,
    program: PropTypes.string.isRequired,
    period: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
}

export default function Item({program, organisation, location, period, description}) {

    return (
        <div className={'education-item'}>
            <div className={'program-and-organisation'}>
                <h3> {program} </h3>
                <h4> {organisation} </h4>
            </div>
            <div className={'education-period'}>
                <span> {period} </span>
            </div>
            <div className={'education-description'}>
                <span> {description} </span>
            </div>
        </div>
    )
}