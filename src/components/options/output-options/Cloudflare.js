// Copyright Mackenly Jones. All rights reserved.
//
// Use of this software is governed by the Business Source License
// included in the LICENSE file.
//
// As of the Change Date specified in that file, in accordance with
// the Business Source License, use of this software will be governed
// by the GNU AFFERO GENERAL PUBLIC LICENSE 3.0.

import { useState, useEffect } from 'react';
import copy from '../../../assets/copy.svg';

export function Cloudflare(props) {
    const [server, setServer] = useState("");
    const [serverKey, setServerKey] = useState("");

    useEffect(() => {
        // update every second
        const interval = setInterval(() => {
            try {
                const data = JSON.parse(sessionStorage.getItem("streamData")).result;
                setServer(data.rtmps.url);
                setServerKey(data.rtmps.streamKey);
            } catch (e) {}
        }
        , 1000);
        return () => clearInterval(interval);
    }, []);
    
    return (
        <div className="Cloudflare">
            <p>Using your encoding software send an RTMP feed to Cloudflare Stream using the following server information:</p>
            <div className='Cloudflare-server-data'>
                <label>Server:</label><br />
                <div className='Cloudflare-server-data-server'>
                    <input type="url" value={ server } readOnly={true} />
                    <img src={ copy } height="18x" alt="Copy to clipboard" onClick={() => {
                        navigator.clipboard.writeText(server);
                        document.getElementById('server-copied').classList.add('show');
                        setTimeout(() => {
                            document.getElementById('server-copied').classList.remove('show');
                        }, 2000);
                    }} />
                </div>
                <span id='server-copied'>Copied 🤠</span><br />
                <label>Stream Key:</label><br />
                <div className='Cloudflare-server-data-key'>
                    <input type="password" value={ serverKey } readOnly={true} />
                    <img src={ copy } height="18x" alt="Copy to clipboard" onClick={() => {
                        navigator.clipboard.writeText(serverKey);
                        document.getElementById('serverKey-copied').classList.add('show');
                        setTimeout(() => {
                            document.getElementById('serverKey-copied').classList.remove('show');
                        }, 2000);
                    }} />
                </div>
                <span id='serverKey-copied'>Copied 🚀</span><br />
                <a href="https://developers.cloudflare.com/stream/stream-live/" target="_blank" rel="noopener noreferrer">Learn more about Cloudflare Stream</a><br />
                <a href="https://dash.cloudflare.com/login" target="_blank" rel="noopener noreferrer">Log in to your Cloudflare account</a>
            </div>
        </div>
    )
}