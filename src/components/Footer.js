// Copyright Mackenly Jones. All rights reserved.
//
// Use of this software is governed by the Business Source License
// included in the LICENSE file.
//
// As of the Change Date specified in that file, in accordance with
// the Business Source License, use of this software will be governed
// by the GNU AFFERO GENERAL PUBLIC LICENSE 3.0.

import GitHubButton from 'react-github-btn'

export function Footer() {
    return (
        <div className="Footer">
            <GitHubButton 
                className="GithubButton"
                href="https://github.com/mackenly" 
                data-color-scheme="no-preference: light; light: light; dark: dark;" 
                data-size="large" 
                aria-label="Follow @mackenly on GitHub">
                    Follow @mackenly
            </GitHubButton>
            <GitHubButton 
                className="GithubButton"
                href="https://github.com/sponsors/mackenly" 
                data-color-scheme="no-preference: light; light: light; dark: dark;" 
                data-icon="octicon-heart" 
                data-size="large" 
                aria-label="Sponsor @mackenly on GitHub">
                Sponsor @mackenly
            </GitHubButton>
            <GitHubButton 
                className="GithubButton"
                href="https://github.com/mackenly/multiflux/issues" 
                data-color-scheme="no-preference: light; light: light; dark: dark;" 
                data-icon="octicon-issue-opened" 
                data-size="large" 
                aria-label="Issue mackenly/multiflux on GitHub">
                Found an issue?
            </GitHubButton>
            <p>
                CloudFlare™ is a registered trademark of CloudFlare, Inc. which is not affiliated with this project.
            </p>
            <p>
                Copyright &copy; {new Date().getFullYear()} Mackenly Jones. <a 
                href="https://github.com/mackenly/multiflux/blob/main/LICENSE" 
                target="_blank" rel="noopener noreferrer">See license here.</a>
            </p>
        </div>
    )
}