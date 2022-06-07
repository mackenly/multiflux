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
import { Options } from '../Options';

export function Rtmp(props) {
    const [serverValue, setServerValue] = useState(props.url);
    const [serverKeyValue, setServerKeyValue] = useState(props.streamKey);

    if (props.id < 1000) {
        const imgs = document.getElementsByTagName('img');
        for (let i = 0; i < imgs.length; i++) {
            if (imgs[i].src.includes('paste')) {
                imgs[i].style.visibility = 'none';
            }
        }
        const inputs = document.getElementsByTagName('input');
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].id.includes('-url') || inputs[i].id.includes('-key')) {
                inputs[i].disabled = true;
            }
        }
    }

    return (
        <div className="Rtmp">
            { props.status === null ?
                <div className="Status-indicator">
                    <svg height="12" width="12">
                        <circle cx="6" cy="6" r="6" fill="red" />
                    </svg>
                    <p>Not Connected</p>
                </div>
            : null 
            }
            <p>Paste your RTMP server information below.</p>
            <div className="Rtmp-server-data">
                <label>Server:</label><br />
                <div className='Rtmp-server-data-server'>
                    <input type="url" id={props.id + '-url'} value={ serverValue } onChange={ (e) => { setServerValue(e.target.value) } } />
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
                    <input type="password" id={props.id + '-key'} value={ serverKeyValue } onChange={ (e) => { 
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