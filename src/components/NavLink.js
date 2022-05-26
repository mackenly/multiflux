export function NavLink(props) {
    return (
        <div className="NavLink">
            <a href={ props.path } target="_blank" rel="noopener noreferrer">
                {props.label}
            </a>
        </div>
    )
}