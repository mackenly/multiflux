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
                    <NavLink label="Logout" path="/logout" />
                </nav>
            </header>
        </>
    )
}