import './Username.css'

function Username(props) {

    return(
        <div className={`Username ${props.className}`}>
            <p>{props.children || "The Mysterious Stranger"}</p>
        </div>
    )
}

export default Username;