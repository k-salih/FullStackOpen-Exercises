const Notification = ({ negative , message }) => {

    const messageStyle  = {
        color: negative ? "red" : "green",
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px",
        textAlign: "center",
    }

    if (message === null) {
        return null;
    }
    return (
        <div style={messageStyle}>
            {message}
        </div>
    )
}

export default Notification