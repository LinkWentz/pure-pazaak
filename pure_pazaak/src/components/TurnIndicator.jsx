function TurnIndicator(props) {
    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden", minHeight: "0", minWidth: "0"}}>
        <p style={{fontSize: "1rem"}}>{(() => {
            if (props.turn) {
                return "Your Turn";
            }
            else {
                return "Opponent's Turn";
            }
            })()}
        </p>
        </div>
    )
}

export default TurnIndicator;