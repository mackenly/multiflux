// Copyright Mackenly Jones. All rights reserved.
//
// Use of this software is governed by the Business Source License
// included in the LICENSE file.
//
// As of the Change Date specified in that file, in accordance with
// the Business Source License, use of this software will be governed
// by the GNU AFFERO GENERAL PUBLIC LICENSE 3.0.

import { NavLink } from './NavLink';
import logo from '../assets/logo.svg';

export function Header() {
    return (
        <>
            <header className="App-header">
                <div>
                    <a href="https://github.com/mackenly/multiflux" rel="noopener noreferrer" target="_blank">
                        <img src={logo} className="App-logo" alt="logo" />
                    </a>
                </div>
                <nav className='nav-container'>
                    <NavLink label="Docs" path="https://github.com/mackenly/multiflux" />
                    <div className="NavLink">
                        <button onClick={
                            sessionStorage.getItem('isSelecting') === 'false' ? toggleSelecting : () => {}
                        }>
                            Select Stream
                        </button>
                    </div>
                </nav>
            </header>
        </>
    )
}

function toggleSelecting() {
    if (sessionStorage.getItem('isSelecting') === 'false') {
        sessionStorage.setItem('isSelecting', 'true');
    } else {
        sessionStorage.setItem('isSelecting', 'false');
    }
    window.location.reload();
}