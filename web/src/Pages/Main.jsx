import { useNavigate } from "react-router-dom";
import Language from "../Components/Language";
import "./Styles/Main.css";

const Main = () => {
    const navigate = useNavigate();
    const start = () => {
        navigate("/step/1");
    };

    return (
        <div id="main" onClick={start}>
            <div className="title">프로젝트명</div>
            <div className="subTitle">서브타이틀</div>
            <div className="languageWrap">
                <Language />
            </div>
            <div className="buttonWrap"></div>
        </div>
    );
};

export default Main;
