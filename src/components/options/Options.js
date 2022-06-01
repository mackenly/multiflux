import { useState } from "react";
import { Cloudflare } from "./output-options/Cloudflare";
import { Rtmp } from "./output-options/Rtmp";
import { Srt } from "./output-options/Srt";

import cfstream from '../../assets/cfstream.svg';
import rtmp from '../../assets/rtmp.svg';
import srt from '../../assets/srt.svg';
import add from '../../assets/add.svg';
import remove from '../../assets/remove.svg';

const outputs = [
    {
        id: 1,
        type: 'cloudflare',
        displayName: 'Cloudflare',
        icon: cfstream,
        content: <Cloudflare 
            server="rtmp://rtmp.cloudflarestream.net/" 
            serverKey="random"
            saveRecording={true}
            requireSignedUrls={false}
        />,
    }
];

export function Options() {
    const [active, setActive] = useState(outputs[0]);
    const [counter, setCounter] = useState(outputs.length);
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
                <button className="Options-tabs-add" onClick={
                    () => {
                        // add a new output to the list
                        setCounter( counter + 1 );
                        const newOutput = {
                            id: counter,
                            type: 'rtmp',
                            displayName: 'RTMP',
                            icon: rtmp,
                            content: <Rtmp
                                server="rtmp://rtmp.cloudflarestream.net/" 
                                serverKey="random" 
                            />
                        };
                        outputs.push( newOutput );
                        setActive( newOutput );
                    }
                }>
                    <img src={ add } alt="Add Icon" />
                    <p>Add RTMP</p>
                </button>
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
                                server="rtmp://rtmp.cloudflarestream.net/"
                            />
                        };
                        outputs.push( newOutput );
                        setActive( newOutput );
                    }
                }>
                    <img src={ add } alt="Add Icon" />
                    <p>Add</p>
                    <img src={ srt } className="srt-logo" alt="SRT" />
                </button>
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