import { Update } from './Update';

const ExampleUpdates = [
    {
        title: "Coming soon...",
        desc: "Stream notifications and updates will appear here in a future update.",
        link: "",
        platform: "cloudflare",
        type: "stream-started",
        datetime: "2022-06-07T21:32:00.000Z"
    }
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