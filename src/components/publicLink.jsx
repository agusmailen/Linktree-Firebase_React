export default function PublicLink({url, title}) {
    return (
        <div>
            <a href={url}>{title}</a>
        </div>
    )
}