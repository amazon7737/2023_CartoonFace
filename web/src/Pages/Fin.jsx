import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Language from "../Components/Language";
import "./Styles/Main.css";
import { LargeBtn2 } from "../Components/Button";
import Slide from "../Components/Slide";

const Fin = () => {
    const navigate = useNavigate();
    const [time, setTime] = useState(5);
    useEffect(() => {
        time > 0 && setTimeout(() => setTime(time - 1), 1000);
        if (time === 0) {
            navigate("/");
        }
    }, [time]);
    return (
        <div id="main">
            <Slide />
            <div className="title">사진 출력중</div>
            <div className="subTitle">이용해주셔서 감사합니다.</div>
            <div className="buttonWrap">
                <LargeBtn2 text={time + "초 후, 초기화면으로 이동합니다."} />
            </div>
        </div>
    );
};

export default Fin;
