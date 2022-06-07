// Copyright Mackenly Jones. All rights reserved.
//
// Use of this software is governed by the Business Source License
// included in the LICENSE file.
//
// As of the Change Date specified in that file, in accordance with
// the Business Source License, use of this software will be governed
// by the GNU AFFERO GENERAL PUBLIC LICENSE 3.0.

import { useState, useEffect } from "react";
import { Cloudflare } from "./output-options/Cloudflare";
import { Rtmp } from "./output-options/Rtmp";
import { Srt } from "./output-options/Srt";

import cfstream from '../../assets/cfstream.svg';
import rtmp from '../../assets/rtmp.svg';
import srt from '../../assets/srt.svg';
import add from '../../assets/add.svg';
import remove from '../../assets/remove.svg';

export function Options(streamData, streamOutputs) {
    const [outputs, setOutputs] = useState([
        {
            id: 1,
            type: 'cloudflare',
            displayName: 'Cloudflare',
            icon: cfstream,
            content: <Cloudflare 
                streamData={streamData}
                streamOutputs={streamOutputs}
            />,
        },
    ]);
    const [active, setActive] = useState(outputs[0]);
    const [counter, setCounter] = useState(outputs.length);

    /*async function addOutput(type) {
        const init = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        };
        const response = await fetch('/api/outputs', init);
        const body = await response.json();
        if (response.status === 401) {
            throw new Error("Unauthorized");
        } else if (response.status !== 200) {
            throw new Error(body);
        }
        setOutputs([...outputs, {
            id: body.id,
            type: type,
            displayName: type,
            icon: type === 'cloudflare' ? cfstream : type === 'rtmp' ? rtmp : srt,
        }]);
        setActive(outputs[outputs.length - 1]);
    }*/

    async function getOutputs() {
        const init = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('key'),
                "account-id": JSON.parse(sessionStorage.getItem('selectedAccount')).id,
            }
        };
        const response = await fetch(`/api/streams/live_inputs/${JSON.parse(sessionStorage.getItem("selectedStream")).uid}/outputs`, init);
        console.log(response);
        const data = await response.json();
        console.log(data);
        const out = data.result.map(output => {
            return {
                id: output.uid,
                type: 'rtmp',
                displayName: 'RTMP',
                icon: rtmp,
                content: <Rtmp
                    outputData={output}
                />
            }
        }
        );
        setOutputs([{
            id: 1,
            type: 'cloudflare',
            displayName: 'Cloudflare',
            icon: cfstream,
            content: <Cloudflare 
                streamData={streamData}
                streamOutputs={streamOutputs}
            />,
        }, ...out]);
    }

    useEffect(() => {
        // update every second
        const interval = setInterval(() => {
            try {
                getOutputs();
                console.log(outputs);
            } catch (e) { }
        }
        , 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="Options">
            <h2>Options and Outputs</h2>
            <div className="Options-tabs">
                { outputs.map( ( output ) => {
                    var classNames = "Options-tab";
                    if ( active === output ) {
                        classNames = "Options-tab Options-tab-active";
                    }
                    if ( output.type === 'srt' ) {
                        return <div className={ classNames } key={ output.id + "-" + output.type } onClick={ () => setActive( output ) }>
                        <img src={ output.icon } className="srt-header-tab" alt={ output.displayName + " Icon" } />
                    </div>
                    }
                    return (
                        <div className={ classNames } key={ output.id + "-" + output.type } onClick={ () => setActive( output ) }>
                            <img src={ output.icon } alt={ output.displayName + " Icon" } />
                            <p>{ output.displayName }</p>
                        </div>
                    );
                }
                )}
                <button className="Options-tabs-add right-rounded" onClick={
                    () => {
                        // add a new output to the list
                        setCounter( counter + 1 );
                        const newOutput = {
                            id: counter,
                            type: 'rtmp',
                            displayName: 'RTMP',
                            icon: rtmp,
                            content: <Rtmp
                                streamData={streamData}
                                streamOutputs={streamOutputs}
                            />
                        };
                        setOutputs( [...outputs, newOutput] );
                        setActive( newOutput );
                    }
                }>
                    <img src={ add } alt="Add Icon" />
                    <p>Add RTMP</p>
                </button>
                {
                    /*
                    <button className="Options-tabs-add right-rounded" onClick={
                        () => {
                            // add a new output to the list
                            setCounter( counter + 1 );
                            const newOutput = {
                                id: counter,
                                type: 'srt',
                                displayName: 'SRT',
                                icon: srt,
                                content: <Srt
                                    streamData={streamData}
                                    streamOutputs={streamOutputs}
                                />
                            };
                            setOutputs( [...outputs, newOutput] );
                            setActive( newOutput );
                        }
                    }>
                        <img src={ add } alt="Add Icon" />
                        <p>Add</p>
                        <img src={ srt } className="srt-logo" alt="SRT" />
                    </button>
                */
                }
            </div>
            <div className="Options-content-header">
                <h3>{ active.displayName }</h3>
                { active.type !== 'cloudflare' &&
                    <img src={ remove } height="30px" title={"Remove " + active.displayName} alt={ "Remove " + active.displayName } onClick={
                        () => {
                            // remove the output from the list
                            outputs.splice( outputs.indexOf( active ), 1 );
                            setActive( outputs[0] );
                        }
                    } />
                }
            </div>
            <>
                { active.content }
            </>
        </div>
    )
}