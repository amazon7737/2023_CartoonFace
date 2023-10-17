// 라이브러리
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// 컴포넌트
import { LargeBtn } from "../Components/Button";
// 스타일시트
import "./Styles/Convert.css";

const Convert = () => {
    const navigate = useNavigate();
    const picList = useSelector((state) => state.selPicList);
    const start = () => {
        navigate("/step/1");
    };
    const sendPic = async () => {
        const response = await axios.post("/convert", {
            theme: "face_paint_512_v1",
            picList: [...picList],
        });
        console.log(response);
    };
    useEffect(() => {
        sendPic();
    }, []);
    return (
        <div id="convert" onClick={start}>
            <div className="title">이미지 변환중</div>
            <div className="subTitle">인공지능이 열심히 그리고 있어요.</div>
            <div className="buttonWrap">
                <LargeBtn text={"잠시만 기다려주세요."} />
            </div>
        </div>
    );
};

export default Convert;
