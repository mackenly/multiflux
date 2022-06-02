import { useState } from "react"

import paste from '../../assets/paste.svg';

export function Auth() {
    const [active, setActive] = useState();

    if (sessionStorage.getItem('isSelecting') === 'false') {
        return;
    }

    return (
        <div className="Auth">
            <div className="Auth-box">
                <div className="Auth-box-header">
                    <h2>Cloudflare Connection</h2>
                </div>
                <div className="Auth-box-content">
                    { 
                        active !== undefined ? active : <Login setActive={ setActive } />
                    }
                </div>
            </div>
        </div>
    )
}

function Login(props) {
    const [emailValue, setEmailValue] = useState("");
    const [key, setKey] = useState("");
    return (
        <div className="Auth-Login">
            <div className="Auth-Login-Container">
                <p>Enter your authentication information below.</p>
                <div className="Auth-form">
                    <label>Email:</label><br />
                    <div className='Auth-form-email'>
                        <input type="email" placeholder="hello@example.com" value={ emailValue } onChange={ (e) => { setEmailValue(e.target.value) } } />
                        <img src={ paste } height="18x" alt="Paste from clipboard" onClick={() => {
                            navigator.clipboard.readText().then(text => {
                                setEmailValue(text.trim());
                            });
                            document.getElementById('email-copied').classList.add('show');
                            setTimeout(() => {
                                document.getElementById('email-copied').classList.remove('show');
                            }, 2000);
                        }} />
                    </div>
                    <span id='email-copied'>Pasted 😎</span><br />
                    <label>Auth Key:</label><br />
                    <div className='Auth-form-key'>
                        <input type="password" placeholder="c2547eb745079dac9320b638f5e225cf483cc5cfdda41" value={ key } onChange={ (e) => { 
                            setKey(e.target.value);
                            e.target.type = 'text';
                            setTimeout(() => {
                                e.target.type = 'password'
                            }, 1500);
                        } } />
                        <img src={ paste } height="18x" alt="Paste from clipboard" onClick={() => {
                            navigator.clipboard.readText().then(text => {
                                setKey(text.trim());
                            });
                            document.getElementById('key-pasted').classList.add('show');
                            setTimeout(() => {
                                document.getElementById('key-pasted').classList.remove('show');
                            }, 2000);
                        }} />
                    </div>
                    <span id='key-pasted'>Pasted 🤿</span><br />
                </div>
            </div>
            <button onClick={() => {
                if (emailValue.length > 0 && key.length > 0) {
                    sessionStorage.setItem('email', emailValue);
                    sessionStorage.setItem('key', key);
                    props.setActive(<Select setActive={ props.setActive } />);
                }
            }}>Login</button>
        </div>
    )
}

function Logout(props) {
    return (
        <div className="Auth-Logout">
            <div className="Auth-Logout-Container">
                <p>Are you sure?</p>
                <button id="Auth-Logout-Cancel" onClick={() => {
                    props.setActive(<Select setActive={ props.setActive } />);
                }}>Cancel</button>
            </div>
            <button onClick={() => {
                props.setActive(<Login setActive={ props.setActive } />);
            }}>Yes, Logout</button>
        </div>
    )
}

function Select(props) {
    return (
        <div className="Auth-Select">
            <div className="Auth-Select-Container">
                <p>Select A Stream</p>
                <div className="Auth-form">
                    <div className='Auth-form-stream'>
                        <select name="stream-selector" id="stream-selector" onChange={ (e) => {
                            console.log(e.target.value);
                        }}>
                            <option value="">Select a stream</option>
                            <option value="1">Stream 1</option>
                            <option value="2">Stream 2</option>
                        </select>
                    </div>
                </div>
                <button id="Auth-Select-Use" onClick={() => {
                    sessionStorage.setItem('isSelecting', false);
                    window.location.reload();
                }}>Select Stream</button>
                <button id="Auth-Select-Add" onClick={() => {
                    props.setActive(<Create setActive={ props.setActive } />);
                }}>Create New Stream</button>
            </div>
            <button onClick={() => {
                props.setActive(<Logout setActive={ props.setActive } />);
            }}>Logout</button>
        </div>
    )
}

function Create(props) {
    return (
        <div className="Auth-Create">
            <div className="Auth-Create-Container">
                <p>Create a new Stream Live Input</p>
                <div className="Auth-form">
                    <label htmlFor="stream-name">Name:</label><br />
                    <div className='Auth-form-name'>
                        <input type="text" name="stream-name" id="stream-name" placeholder="Stream Name" /><br />
                    </div>
                    <label htmlFor="stream-save">Save Recordings:</label><br />
                    <div className='Auth-form-save'>
                        <select name="stream-save" id="stream-save">
                            <option value="automatic">Automatic Recording</option>
                            <option value="off">Disable Recording</option>
                        </select>
                    </div>
                </div>
                <button id="Auth-Create-Add" onClick={() => {
                    props.setActive(<Select setActive={ props.setActive } />);
                }}>Create Stream on Cloudflare</button>
            </div>
            <button onClick={() => {
                props.setActive(<Select setActive={ props.setActive } />);
            }}>Cancel</button>
        </div>
    )
}