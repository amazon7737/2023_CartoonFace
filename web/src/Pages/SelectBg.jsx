import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles/SelectBg.css";
import { NextStepBtn } from "../Components/Button";
import LogoOriginal from "../Assets/Images/logoOriginal.png";
import LogoWhite from "../Assets/Images/logoWhite.png";

const SelectBG = () => {
    const navigate = useNavigate();
    const nextStep = () => {
        navigate("/step/4");
    };
    return (
        <>
            <div id="selectBg">
                <div className="frameListWrap">
                    <div className="row">
                        <Frame active={true} type={1} />
                        <Frame type={2} />
                    </div>
                    <div className="row">
                        <Frame type={3} />
                    </div>
                </div>
            </div>
            <NextStepBtn text={"배경 선택 완료"} func={nextStep} />
        </>
    );
};

const Frame = ({ active, type }) => {
    return (
        <div className={active ? "frameWrap active" : "frameWrap"}>
            <div className={"frame frame" + type}>
                <div className="row2">
                    <img className="pic" src="" alt="" srcset="" />
                    <img className="pic" src="" alt="" srcset="" />
                </div>
                <div className="row2">
                    <img className="pic" src="" alt="" srcset="" />
                    <img className="pic" src="" alt="" srcset="" />
                </div>
                <img
                    className="logo"
                    src={type === 1 ? LogoWhite : LogoOriginal}
                    alt=""
                    srcset=""
                />
            </div>
        </div>
    );
};

export default SelectBG;
