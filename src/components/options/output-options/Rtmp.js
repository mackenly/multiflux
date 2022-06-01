import { useState } from 'react';

import paste from '../../../assets/paste.svg';

export function Rtmp(props) {
    const [serverValue, setServerValue] = useState(props.server);
    const [serverKeyValue, setServerKeyValue] = useState(props.serverKey);
    return (
        <div className="Rtmp">
            <p>Paste your RTMP server information below.</p>
            <div className="Rtmp-server-data">
                <label>Server:</label><br />
                <div className='Rtmp-server-data-server'>
                    <input type="url" value={ serverValue } onChange={ (e) => { setServerValue(e.target.value) } } />
                    <img src={ paste } height="18x" alt="Paste from clipboard" onClick={() => {
                        navigator.clipboard.readText().then(text => {
                            setServerValue(text.trim());
                        });
                        document.getElementById('server-copied').classList.add('show');
                        setTimeout(() => {
                            document.getElementById('server-copied').classList.remove('show');
                        }, 2000);
                    }} />
                </div>
                <span id='server-copied'>Pasted 👽</span><br />
                <label>Stream Key:</label><br />
                <div className='Rtmp-server-data-key'>
                    <input type="password" value={ serverKeyValue } onChange={ (e) => { 
                        setServerKeyValue(e.target.value);
                        e.target.type = 'text';
                        setTimeout(() => {
                            e.target.type = 'password'
                        }, 1500);
                        }} />
                    <img src={ paste } height="18x" alt="Paste from clipboard" onClick={() => {
                        navigator.clipboard.readText().then(text => {
                            setServerKeyValue(text.trim());
                        });
                        document.getElementById('serverKey-copied').classList.add('show');
                        setTimeout(() => {
                            document.getElementById('serverKey-copied').classList.remove('show');
                        }, 2000);
                    }} />
                </div>
                <span id='serverKey-copied'>Pasted 🦆</span><br />
            </div>
        </div>
    )
}