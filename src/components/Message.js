import PropTypes from 'prop-types';

import vert_menu from '../assets/vert-menu.svg';
import ban_user from '../assets/ban-user.svg';
import moderator from '../assets/moderator.svg';
import mute from '../assets/mute.svg';
import timeout from '../assets/timeout.svg';
import user_profile from '../assets/user-profile.svg';

export function Message(props) {
    const { author_name, author_avatar, role, message, datetime } = props;

    var time = new Date( datetime );
    if (role === 'mod') {
        var isMod = true;
    } else {
        var isMod = false;
    }

    return (
        <li>
            <div className="Chat-item">
                <h3>{ author_name + " said..." }</h3>
                <img src={ author_avatar } alt={ author_name + " Avatar" }></img>
                { isMod ? <img id='mod-label' src={ moderator } alt={ author_name + " Moderator" }></img> : null }
                <p>{ time.toLocaleTimeString() } - { message }</p>
                <div className="Chat-item-actions">
                    <button>
                        <img src={ vert_menu } alt="Action Menu"></img>
                    </button>
                    <div className="Chat-item-actions-menu">
                        <ul>
                            <li>
                                <button>
                                    <img src={ mute } alt="Action Menu"></img>
                                    <p>Mute User</p>
                                </button>
                            </li>
                            <li>
                                <button>
                                    <img src={ ban_user } alt="Action Menu"></img>
                                    <p>Ban User</p>
                                </button>
                            </li>
                            <li>
                                <button>
                                    <img src={ timeout } alt="Action Menu"></img>
                                    <p>1 Hour Timeout</p>
                                </button>
                            </li>
                            { isMod && <li>
                                <button>
                                    <img src={ moderator } alt="Action Menu"></img>
                                    <p>Revoke Moderator</p>
                                </button>
                            </li>
                            }
                            { !isMod && <li>
                                <button>
                                    <img src={ moderator } alt="Action Menu"></img>
                                    <p>Make Moderator</p>
                                </button>
                            </li>
                            }
                            <li>
                                <button>
                                    <img src={ user_profile } alt="Action Menu"></img>
                                    <p>View User</p>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </li>
    )
}

// prop types:
Message.propTypes = {
    author_name: PropTypes.string.isRequired,
    author_avatar: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    datetime: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired
}