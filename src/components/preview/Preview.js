import cfstream from '../../assets/cfstream.svg';

export function Preview() {
    return (
        <div className="Preview">
            <div className="Preview-header">
                <div className="Preview-header-status">
                    <svg height="20" width="20">
                        <circle cx="10" cy="10" r="10" fill="red" />
                    </svg>
                    <h2>Live Preview</h2>
                </div>
                <div className="Preview-header-icons">
                    <img src={cfstream} alt="cfstream" />
                </div>
            </div>
            <div className="Preview-content">
                <video src="https://archive.org/download/ISSVideoResourceEarthViews720p/ISS%20Video%20Resource_Earth_Views_720p.mp4" width="100%" height="auto" autoPlay loop muted controls />
            </div>
        </div>
    )
}