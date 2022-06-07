// Copyright Mackenly Jones. All rights reserved.
//
// Use of this software is governed by the Business Source License
// included in the LICENSE file.
//
// As of the Change Date specified in that file, in accordance with
// the Business Source License, use of this software will be governed
// by the GNU AFFERO GENERAL PUBLIC LICENSE 3.0.

import { useState, useEffect } from 'react';
import { Stream } from '@cloudflare/stream-react';

import cfstream from '../../assets/cfstream.svg';

export function Preview() {
    const [preview, setPreview] = useState(null);
    const [streamName, setStreamName] = useState('');

    useEffect(() => {
        const selectedStream = JSON.parse(sessionStorage.getItem('selectedStream'));
        if (selectedStream !== null && selectedStream !== undefined) {
            setPreview(<Stream controls autoPlay responsive src={selectedStream.uid} className='Stream' />);
            setStreamName("- " + selectedStream.meta.name);
        }
    }, []);

    return (
        <div className="Preview">
            <div className="Preview-header">
                <div className="Preview-header-status">
                    <svg height="20" width="20">
                        <circle cx="10" cy="10" r="10" fill="red" />
                    </svg>
                    <h2>Live Preview {streamName}</h2>
                </div>
                <div className="Preview-header-icons">
                    <img src={cfstream} alt="cfstream" />
                </div>
            </div>
            <div className="Preview-content">
                {preview}
            </div>
        </div>
    )
}