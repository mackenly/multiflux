import { Update } from './Update';

const ExampleUpdates = [
    /*{
        title: "Stream Started",
        desc: "Recieved a stream from the source.",
        link: "https://www.facebook.com/pg/GoldenRidgeGoalposts/videos/",
        platform: "cloudflare",
        type: "stream-started",
        datetime: "2020-01-01T00:08:00.000Z"
    },
    {
        title: "RTMP Output Added",
        desc: "Added an RTMP output to the stream.",
        link: "https://www.facebook.com/pg/GoldenRidgeGoalposts/videos/",
        platform: "rtmp",
        type: "rtmp-output-added",
        datetime: "2020-01-01T00:08:00.000Z"
    },
    {
        title: "Stream Stopped",
        desc: "The stream stopped.",
        link: "https://www.facebook.com/pg/GoldenRidgeGoalposts/videos/",
        platform: "cloudflare",
        type: "stream-stopped",
        datetime: "2020-01-01T00:09:00.000Z"
    }*/
];

export function Updates() {
    return (
        <div className="Updates">
            <h2>Updates</h2>
            <ul>
                { ExampleUpdates.map( ( message ) => {
                    return <Update key={ message.datetime + message.title } title={ message.title } desc={ message.desc } link={ message.link } platform={ message.platform } type={ message.type } datetime={ message.datetime } />
                })}
            </ul>
        </div>
    )
}