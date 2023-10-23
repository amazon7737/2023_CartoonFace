// 라이브러리
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import axios from "axios";
// 컴포넌트
import { ChangeBtn, NextStepBtn } from "../Components/Button";
// 스타일시트
import "./Styles/Print.css";
// 이미지
import LogoOriginal from "../Assets/Images/logoOriginalLarge.png";
import LogoWhite from "../Assets/Images/logoWhiteLarge.png";

const Print = () => {
    // 리액트 기본 셋팅
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ref = useRef();
    // 배경
    const type = useSelector((state) => state.selBg);
    // 변환 사진 목록
    const picList = useSelector((state) => state.convPicList);
    const printPhoto = () => {
        html2canvas(document.getElementById("target"), {
            allowTaint: true,
            useCORS: true,
        }).then((canvas) => {
            onSaveAs(canvas.toDataURL("imgae/png"));
        });
    };
    const onSaveAs = async (uri) => {
        const response = await axios.post(API + "/print", {
            img: uri,
        });
        console.log(response);
        navigate("/fin")
    };
    //API서버 주소
    const API = "http://localhost:3001";
    // 페이지 제목 설정
    useEffect(() => {
        dispatch({
            type: "SET_PAGE_NAME",
            payload: "사진 출력",
        });
    }, []);
    return (
        <>
            <div id="print">
                <div id="target" className="resultWrap">
                    <div className={"result frame" + type}>
                        <div className="row">
                            <img
                                className="pic"
                                src={API + picList[0]}
                                alt="1번사진"
                                srcset=""
                                crossOrigin="anonymous"
                            />
                            <img
                                className="pic"
                                src={API + picList[1]}
                                alt="2번사진"
                                srcset=""
                                crossOrigin="anonymous"
                            />
                        </div>
                        <div className="row">
                            <img
                                className="pic"
                                src={API + picList[2]}
                                alt="3번사진"
                                srcset=""
                                crossOrigin="anonymous"
                            />
                            <img
                                className="pic"
                                src={API + picList[3]}
                                alt=""
                                srcset=""
                                crossOrigin="anonymous"
                            />
                        </div>
                        <div className="logo">
                            <img
                                src={type === 1 ? LogoWhite : LogoOriginal}
                                alt="로고"
                                srcset=""
                            />
                        </div>
                    </div>
                </div>
            </div>
            <NextStepBtn text={"출력"} func={printPhoto} />
        </>
    );
};

export default Print;
