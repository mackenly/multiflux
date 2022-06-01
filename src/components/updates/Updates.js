import { Update } from './Update';

import youtube from '../../assets/youtube.svg';
import facebooklive from '../../assets/facebooklive.svg';
import cfstream from '../../assets/cfstream.svg';

const ExampleUpdates = [
    {
        title: "Facebook Started",
        desc: "Facebook page Golden Ridge Goalposts has started streaming.",
        link: "https://www.facebook.com/pg/GoldenRidgeGoalposts/videos/",
        platform: "facebook",
        icon: facebooklive,
        datetime: "2020-01-01T00:08:00.000Z"
    },
    {
        title: "YouTube Started",
        desc: "YouTube channel Golden Ridge Goalposts has started streaming.",
        link: "https://www.youtube.com/channel/UC-_X-_X-_X-_X-_X-_X-",
        platform: "youtube",
        icon: youtube,
        datetime: "2020-01-01T00:06:00.000Z"
    },
    {
        title: "Facebook Started",
        desc: "Facebook page Golden Ridge Goalposts has started streaming.",
        link: "https://www.facebook.com/pg/GoldenRidgeGoalposts/videos/",
        platform: "facebook",
        icon: facebooklive,
        datetime: "2020-01-01T00:07:00.000Z"
    },
    {
        title: "YouTube Started",
        desc: "YouTube channel Golden Ridge Goalposts has started streaming.",
        link: "https://www.youtube.com/channel/UC-_X-_X-_X-_X-_X-_X-",
        platform: "youtube",
        icon: youtube,
        datetime: "2020-01-01T00:05:00.000Z"
    },
    {
        title: "Facebook Started",
        desc: "Facebook page Golden Ridge Goalposts has started streaming.",
        link: "https://www.facebook.com/pg/GoldenRidgeGoalposts/videos/",
        platform: "facebook",
        icon: facebooklive,
        datetime: "2020-01-01T00:04:00.000Z"
    }
];

export function Updates() {
    return (
        <div className="Updates">
            <h2>Updates</h2>
            <ul>
                { ExampleUpdates.map( ( message ) => {
                    return <Update key={ message.datetime + message.title } title={ message.title } desc={ message.desc } link={ message.link } platform={ message.platform } icon={ message.icon } datetime={ message.datetime } />
                })}
            </ul>
        </div>
    )
}