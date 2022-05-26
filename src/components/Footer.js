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
                Copyright &copy; {new Date().getFullYear()} Mackenly Jones. <a 
                href="https://github.com/mackenly/multiflux/blob/main/LICENSE" 
                target="_blank" rel="noopener noreferrer">See license here.</a>
            </p>
        </div>
    )
}