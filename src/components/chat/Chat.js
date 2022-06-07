// Copyright Mackenly Jones. All rights reserved.
//
// Use of this software is governed by the Business Source License
// included in the LICENSE file.
//
// As of the Change Date specified in that file, in accordance with
// the Business Source License, use of this software will be governed
// by the GNU AFFERO GENERAL PUBLIC LICENSE 3.0.

import { useState } from 'react';
import { Message } from './Message';

import send from '../../assets/send.svg';
import calendar from '../../assets/calendar.svg';

const chats = [
    /*{
        id: 1,
        author_name: 'George',
        author_avatar: 'https://randomuser.me/api/portraits/men/92.jpg',
        role: 'default',
        message: 'Hello, how are you?',
        datetime: '2020-01-01T00:07:00.000Z'
    },
    {
        id: 2,
        author_name: 'Amy',
        author_avatar: 'https://randomuser.me/api/portraits/women/81.jpg',
        role: 'mod',
        message: 'Prety good, how are you?',
        datetime: '2020-01-01T00:07:00.000Z'
    },
    {
        id: 3,
        author_name: 'Dan',
        author_avatar: 'https://randomuser.me/api/portraits/men/62.jpg',
        role: 'default',
        message: 'Hello, how are you?',
        datetime: '2020-01-01T00:07:00.000Z'
    },
    {
        id: 4,
        author_name: 'Presley',
        author_avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        role: 'default',
        message: 'Prety good, how are you?',
        datetime: '2020-01-01T00:07:00.000Z'
    },
    {
        id: 5,
        author_name: 'George',
        author_avatar: 'https://randomuser.me/api/portraits/men/84.jpg',
        role: 'default',
        message: 'Hello, how are you?',
        datetime: '2020-01-01T00:07:00.000Z'
    },
    {
        id: 6,
        author_name: 'Amy',
        author_avatar: 'https://randomuser.me/api/portraits/women/73.jpg',
        role: 'mod',
        message: 'Prety good, how are you?',
        datetime: '2020-01-01T00:07:00.000Z'
    },
    {
        id: 7,
        author_name: 'Dan',
        author_avatar: 'https://randomuser.me/api/portraits/men/54.jpg',
        role: 'default',
        message: 'Hello, how are you?',
        datetime: '2020-01-01T00:07:00.000Z'
    },
    {
        id: 8,
        author_name: 'Presley',
        author_avatar: 'https://randomuser.me/api/portraits/women/36.jpg',
        role: 'default',
        message: 'Prety good, how are you?',
        datetime: '2020-01-01T00:07:00.000Z'
    },
    {
        id: 9,
        author_name: 'George',
        author_avatar: 'https://randomuser.me/api/portraits/men/83.jpg',
        role: 'default',
        message: 'Hello, how are you?',
        datetime: '2020-01-01T00:07:00.000Z'
    },
    {
        id: 10,
        author_name: 'Amy',
        author_avatar: 'https://randomuser.me/api/portraits/women/72.jpg',
        role: 'mod',
        message: 'Prety good, how are you?',
        datetime: '2020-01-01T00:07:00.000Z'
    },
    {
        id: 11,
        author_name: 'Dan',
        author_avatar: 'https://randomuser.me/api/portraits/men/53.jpg',
        role: 'default',
        message: 'Hello, how are you?',
        datetime: '2020-01-01T00:07:00.000Z'
    },
    {
        id: 12,
        author_name: 'Presley',
        author_avatar: 'https://randomuser.me/api/portraits/women/35.jpg',
        role: 'default',
        message: 'Prety good, how are you?',
        datetime: '2020-01-01T00:07:00.000Z'
    },
    {
        id: 13,
        author_name: 'George',
        author_avatar: 'https://randomuser.me/api/portraits/men/81.jpg',
        role: 'default',
        message: 'Hello, how are you?',
        datetime: '2020-01-01T00:07:00.000Z'
    },
    {
        id: 14,
        author_name: 'Amy',
        author_avatar: 'https://randomuser.me/api/portraits/women/70.jpg',
        role: 'mod',
        message: 'Prety good, how are you?',
        datetime: '2020-01-01T00:07:00.000Z'
    },
    {
        id: 15,
        author_name: 'Dan',
        author_avatar: 'https://randomuser.me/api/portraits/men/51.jpg',
        role: 'default',
        message: 'Hello, how are you?',
        datetime: '2020-01-01T00:07:00.000Z'
    },
    {
        id: 16,
        author_name: 'Presley',
        author_avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
        role: 'default',
        message: 'Prety good, how are you?',
        datetime: '2020-01-01T00:07:00.000Z'
    }*/
]

export function Chat() {

    const [ inputValue, setInputValue ] = useState("");

    return (
        <div className="Chat">
            <div className="Chat-header">
                <h2>
                    Chats
                </h2>
            </div>
            <div className="Chat-content">
                { chats.length > 0 &&
                <ul>
                    { chats.map( ( chat ) => {
                        return <Message key={ chat.id } author_name={ chat.author_name } author_avatar={ chat.author_avatar } message={ chat.message } datetime={ chat.datetime } role={ chat.role } />
                    })}
                </ul>
                }
                { chats.length === 0 &&
                    <div className="Chat-empty">
                        <div className="Chat-empty-container">
                            <img src={ calendar } alt="Calendar Icon" />
                            <p>
                                Coming soon...
                            </p>
                        </div>
                    </div>
                }
            </div>
            { chats.length > 0 &&
                <div className="Chat-sender">
                    <input 
                        type="text" 
                        placeholder="Type a message..."
                        value={ inputValue }
                        onChange={ ( e ) => setInputValue( e.target.value ) }
                    />
                    <img src={ send } height="30px" alt="Send Message"></img>
                </div>
            }
        </div>
    )
}