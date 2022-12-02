import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  const messageStyle = {
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
    textAlign: "center",
  };

  if (notification === "") {
    return null;
  }

  return <div style={messageStyle}>{notification}</div>;
};

export default Notification;
