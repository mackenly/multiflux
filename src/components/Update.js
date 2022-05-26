import { PropTypes } from 'prop-types';

export function Update(props) {
    const { title, desc, link, platform, icon, datetime } = props;
    var time = new Date( datetime );
    
    return (
        <li>
            <div className="Updates-item">
                <h3>Event: <span>{ title }</span> - { time.toLocaleTimeString() }</h3>
                <img src={ icon } alt={ platform + " Icon"}></img>
                <p>{ desc }</p>
            </div>
        </li>
    )
}

Update.propTypes = {
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    platform: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    datetime: PropTypes.string.isRequired
}