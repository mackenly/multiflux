import { useState } from "react";
import { Cloudflare } from "./output-options/Cloudflare";
import { YouTube } from "./output-options/YouTube";
import { Facebook } from "./output-options/Facebook";
import { Rtmp } from "./output-options/Rtmp";

import youtube from '../assets/youtube.svg';
import facebooklive from '../assets/facebooklive.svg';
import cfstream from '../assets/cfstream.svg';
import rtmp from '../assets/rtmp.svg';
import add from '../assets/add.svg';
import remove from '../assets/remove.svg';

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
    return (
        <div className="Options">
            <h2>Options and Outputs</h2>
            <div className="Options-tabs">
                { outputs.map( ( output ) => {
                    var classNames = "Options-tab";
                    if ( active === output ) {
                        classNames = "Options-tab Options-tab-active";
                    }
                    return (
                        <div className={ classNames } key={ output.id + "-" + output.type } onClick={ () => setActive( output ) }>
                            <img src={ output.icon } alt={ output.displayName + " Icon" } />
                            <p>{ output.displayName }</p>
                        </div>
                    );
                }
                )}
                <button className="Options-tabs-add">
                    <img src={ add } alt="Add Icon" />
                    <p>Add</p>
                    <div className="Options-tabs-add-menu">
                        <ul>
                            <li onClick={
                                () => {
                                    // add a new output to the list
                                    const newOutput = {
                                        id: outputs.length + 1,
                                        type: 'rtmp',
                                        displayName: 'RTMP',
                                        icon: rtmp,
                                        content: <Rtmp />
                                    };
                                    outputs.push( newOutput );
                                    setActive( newOutput );
                                }
                            }>
                                <div>
                                    <img src={ rtmp } alt="Add an rtmp output"></img>
                                    <p>RTMP</p>
                                </div>
                            </li>
                            <li onClick={
                                () => {
                                    // add a new output to the list
                                    const newOutput = {
                                        id: outputs.length + 1,
                                        type: 'youtube',
                                        displayName: 'YouTube Live',
                                        icon: youtube,
                                        content: <YouTube />
                                    };
                                    outputs.push( newOutput );
                                    setActive( newOutput );
                                }
                            }>
                                <div>
                                    <img src={ youtube } alt="Add a YouTube output"></img>
                                    <p>YouTube</p>
                                </div>
                            </li>
                            <li onClick={
                                () => {
                                    // add a new output to the list
                                    const newOutput = {
                                        id: outputs.length + 1,
                                        type: 'facebooklive',
                                        displayName: 'Facebook Live',
                                        icon: facebooklive,
                                        content: <Facebook />
                                    };
                                    outputs.push( newOutput );
                                    setActive( newOutput );
                                }
                            }>
                                <div>
                                    <img src={ facebooklive } alt="Add a Facebook Live output"></img>
                                    <p>Facebook Live</p>
                                </div>
                            </li>
                        </ul>
                    </div>
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