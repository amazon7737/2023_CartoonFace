import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles/Print.css";
import { ChangeBtn, NextStepBtn } from "../Components/Button";
import ImgPlaceholder from "../Assets/Images/imgPlaceholder.png";

const Print = () => {
    const navigate = useNavigate();
    const nextStep = () => {
        navigate("/step/5");
    };
    return (
        <>
            <div id="print">
                <div className="resultWrap">
                    <div className="result"></div>
                </div>
            </div>
            <div className="btnWrap">
                <ChangeBtn
                    text={"배경 변경"}
                    func={() => {
                        navigate("/step/3");
                    }}
                />
                <ChangeBtn
                    text={"필터 변경"}
                    func={() => {
                        navigate("/step/4");
                    }}
                />
            </div>
            <NextStepBtn text={"출력"} func={nextStep} />
        </>
    );
};

export default Print;
