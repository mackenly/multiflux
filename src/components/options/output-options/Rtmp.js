// Copyright Mackenly Jones. All rights reserved.
//
// Use of this software is governed by the Business Source License
// included in the LICENSE file.
//
// As of the Change Date specified in that file, in accordance with
// the Business Source License, use of this software will be governed
// by the GNU AFFERO GENERAL PUBLIC LICENSE 3.0.

import { useState, useEffect } from 'react';

import paste from '../../../assets/paste.svg';

export function Rtmp(props) {
    const [serverValue, setServerValue] = useState(props.url);
    const [serverKeyValue, setServerKeyValue] = useState(props.streamKey);

    return (
        <div className="Rtmp">
            <div className="Status-indicator">
                <svg height="12" width="12">
                    <circle cx="6" cy="6" r="6" fill="red" />
                </svg>
                <p>Disconnected</p>
            </div>
            <p>Paste your RTMP server information below.</p>
            <div className="Rtmp-server-data">
                <label>Server:</label><br />
                <div className='Rtmp-server-data-server'>
                    <input type="url" value={ serverValue } onChange={ (e) => { setServerValue(e.target.value) } } />
                    <img src={ paste } height="18x" alt="Paste from clipboard" onClick={() => {
                        navigator.clipboard.readText().then(text => {
                            setServerValue(text.trim());
                        });
                        document.getElementById('server-pasted').classList.add('show');
                        setTimeout(() => {
                            document.getElementById('server-pasted').classList.remove('show');
                        }, 2000);
                    }} />
                </div>
                <span id='server-pasted'>Pasted 👽</span><br />
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
                        document.getElementById('serverKey-pasted').classList.add('show');
                        setTimeout(() => {
                            document.getElementById('serverKey-pasted').classList.remove('show');
                        }, 2000);
                    }} />
                </div>
                <span id='serverKey-pasted'>Pasted 🦆</span><br />
            </div>
        </div>
    )
}