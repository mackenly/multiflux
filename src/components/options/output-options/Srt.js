// Copyright Mackenly Jones. All rights reserved.
//
// Use of this software is governed by the Business Source License
// included in the LICENSE file.
//
// As of the Change Date specified in that file, in accordance with
// the Business Source License, use of this software will be governed
// by the GNU AFFERO GENERAL PUBLIC LICENSE 3.0.

import { useState } from 'react';

import paste from '../../../assets/paste.svg';

export function Srt(props) {
    const [serverValue, setServerValue] = useState("");
    return (
        <div className="Srt">
            <div className="Status-indicator">
                <svg height="12" width="12">
                    <circle cx="6" cy="6" r="6" fill="red" />
                </svg>
                <p>Disconnected</p>
            </div>
            <p>Paste your SRT server information below.</p>
            <div className="Srt-server-data">
                <label>Server:</label><br />
                <div className='Srt-server-data-server'>
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
                <span id='server-pasted'>Pasted 🦾</span><br />
            </div>
        </div>
    )
}