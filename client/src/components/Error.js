

export default function Error({name, message}) {
    
    return (
        <div className="wrap">
            <h2>{name? name : "Not Found"}</h2>
            <p>{message? message : "Sorry! We couldn't find the page you're looking for."}</p>
        </div>
    )
}
