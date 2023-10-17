import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Styles/Print.css";
import { ChangeBtn, NextStepBtn } from "../Components/Button";
import ImgPlaceholder from "../Assets/Images/imgPlaceholder.png";

const Print = () => {
    // 리액트 기본 셋팅
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // 변환 사진 목록
    const picList = useSelector((state) => state.convPicList);
    const nextStep = () => {
        navigate("/step/5");
    };
    return (
        <>
            <div id="print">
                <div className="resultWrap">
                    <div className="result">
                        {picList.map((img, idx) => (
                            <img
                                src={"http://192.168.0.23:3001" + img}
                                alt={idx}
                                srcset=""
                            />
                        ))}
                    </div>
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
