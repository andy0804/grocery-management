import { useEffect, useState } from "react";
import "./Progress.css";
const ProgressBar = (props) => {
  const [completed, setCompleted] = useState(100);

  useEffect(() => {
    setTimeout(() => setCompleted(props.completed), 300);
  }, []);
  const { bgcolor } = props;

  const containerStyles = {
    height: 20,
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: 50,
  };
  const getCustomColor = (val) => {
    console.log("Val", val);
    if (val >= 80) {
      return "#00FF00";
    } else if (val >= 60 && val < 80) {
      return "#b5a642";
    } else if (val >= 40 && val < 60) {
      return "#FFA500";
    } else if (val >= 20 && val < 40) {
      return "#8b0000";
    } else {
      return "#8b0000";
    }
  };
  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: getCustomColor(completed),
    borderRadius: "inherit",
    textAlign: "right",
    transition: "width 1s ease-in-out",
  };

  const labelStyles = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
  };

  return (
    <div className={completed <= 50 ? "glow" : ""} style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
