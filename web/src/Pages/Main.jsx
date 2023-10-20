import { useNavigate } from "react-router-dom";
import Language from "../Components/Language";
import "./Styles/Main.css";
import { LargeBtn } from "../Components/Button";
import Slide from "../Components/Slide";

const Main = () => {
    const navigate = useNavigate();
    const start = () => {
        navigate("/step/1");
    };

    return (
        <div id="main" onClick={start}>
            <Slide />
            <div className="title">Cartoon Face</div>
            <div className="subTitle">만화주인공같은 내얼굴</div>
            <div className="buttonWrap">
                <LargeBtn text={"화면을 클릭해주세요."} />
            </div>
        </div>
    );
};

export default Main;
