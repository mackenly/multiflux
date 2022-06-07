// Copyright Mackenly Jones. All rights reserved.
//
// Use of this software is governed by the Business Source License
// included in the LICENSE file.
//
// As of the Change Date specified in that file, in accordance with
// the Business Source License, use of this software will be governed
// by the GNU AFFERO GENERAL PUBLIC LICENSE 3.0.

export function NavLink(props) {
    return (
        <div className="NavLink">
            <a href={ props.path } target="_blank" rel="noopener noreferrer">
                {props.label}
            </a>
        </div>
    )
}