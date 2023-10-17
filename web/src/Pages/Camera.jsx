import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles/Camera.css";

const Camera = () => {
    const navigate = useNavigate();
    const nextStep = () => {
        navigate("/step/2");
    };
    useEffect(() => {}, []);
    return <div id="camera" onClick={nextStep}></div>;
};

export default Camera;
