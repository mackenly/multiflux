import { PropTypes } from 'prop-types';

import cfstream from '../../assets/cfstream.svg';
import rtmp from '../../assets/rtmp.svg';
import warning from '../../assets/warning.svg';
import notification from '../../assets/notification.svg';

export function Update(props) {
    const { title, desc, link, platform, type, datetime } = props;
    var time = new Date( datetime );
    
    return (
        <li>
            <div className="Updates-item">
                <h3><span>{ title }</span> - { time.toLocaleTimeString() }</h3>
                <img src={ icon(type, platform) } alt={ platform + " Icon"}></img>
                <p>{ desc }</p>
            </div>
        </li>
    )
}

function icon(type, platform) {
    var icon = null;
    switch (type) {
        case "stream-started":
            icon = notification;
            break;
        case "stream-stopped":
            icon = warning;
            break;
        case "stream-error":
            icon = warning;
            break;
        case "stream-warning":
            icon = warning;
            break;
        case "stream-recover":
            icon = notification;
            break;
        case "stream-update":
            icon = notification;
            break;
        case "stream-info":
            icon = notification;
            break;
        case "rtmp-output-added":
            icon = rtmp;
            break;
        case "rtmp-output-removed":
            icon = rtmp;
            break;
        case "cf-too-many-requests":
            return cfstream;
        case "cf-stream-not-found":
            icon = cfstream;
            break;
        case "cf-unauorized":
            icon = cfstream;
            break;
        default:
            icon = notification;
            break;
    }
    return icon;
}

Update.propTypes = {
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    platform: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    datetime: PropTypes.string.isRequired
}