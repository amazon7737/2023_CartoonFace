// 라이브러리
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
// 컴포넌트
import Header from "../Components/Header";
import Footer from "../Components/Footer";
// 스타일시트
import "./Styles/Layout.css";

const StepLayout = () => {
    const pageName = useSelector((state) => state.pageName);
    return (
        <div className="layout step">
            <Header title={pageName} />
            <div id="content">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default StepLayout;
