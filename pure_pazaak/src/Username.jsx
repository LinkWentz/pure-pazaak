import './Username.css'

function Username(props) {

    return(
        <div className="Username">
            <p>{props.children || "The Mysterious Stranger"}</p>
        </div>
    )
}

export default Username;