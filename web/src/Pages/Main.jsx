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
            <div className="title">프로젝트명</div>
            <div className="subTitle">서브타이틀</div>
            <div className="buttonWrap">
                <LargeBtn text={"화면을 클릭해주세요."} />
            </div>
        </div>
    );
};

export default Main;
