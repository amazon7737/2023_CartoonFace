// 라이브러리
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// 컴포넌트
import { LargeBtn } from "../Components/Button";
// 스타일시트
import "./Styles/Convert.css";
import Slide from "../Components/Slide";

const Convert = () => {
    // 리액트 기본 셋팅
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // 선택 사진 목록
    const picList = useSelector((state) => state.selPicList);
    // 선택 필터
    const filter = useSelector((state) => state.selFilter);
    // 사진 변환
    const sendPic = async () => {
        const response = await axios.post("/convert", {
            theme: filter,
            picList: [...picList],
        });
        console.log(response.data);
        if (response.data.status === 200) {
            dispatch({
                type: "SET_CONV_PIC_LIST",
                payload: response.data.data,
            });
            navigate("/step/5");
        } else {
            window.alert("사진 변환중 오류가 발생했습니다.");
            navigate("/");
        }
    };
    useEffect(() => {
        sendPic();
    }, []);
    return (
        <div id="convert">
            <Slide />
            <div className="title">이미지 변환중</div>
            <div className="subTitle">인공지능이 열심히 그리고 있어요.</div>
            <div className="buttonWrap">
                <LargeBtn text={"잠시만 기다려주세요."} />
            </div>
        </div>
    );
};

export default Convert;
