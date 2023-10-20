// 라이브러리
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactToPrint from "react-to-print";
// 컴포넌트
import { ChangeBtn, NextStepBtn } from "../Components/Button";
// 스타일시트
import "./Styles/Print.css";
// 이미지
import LogoOriginal from "../Assets/Images/logoOriginalLarge.png";
import LogoWhite from "../Assets/Images/logoWhiteLarge.png";
import html2canvas from "html2canvas";

const Print = () => {
    // 리액트 기본 셋팅
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // 배경
    const type = useSelector((state) => state.selBg);
    // 변환 사진 목록
    const picList = useSelector((state) => state.convPicList);
    const printPhoto = () => {
        const target = document.getElementById("target");
        if (!target) {
            return alert("결과 저장에 실패했습니다.");
        }
        html2canvas(target).then((canvas) => {
            const link = document.createElement("a");
            document.body.appendChild(link);
            link.href = canvas.toDataURL("image/png");
            link.download = "result.png";
            link.click();
            document.body.removeChild(link);
        });
        navigate("/fin");
    };
    const ref = useRef();
    //API서버 주소
    const API = "http://127.0.0.1:3001";
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
                    <div className={"result frame" + type} ref={ref}>
                        <div className="row">
                            <img
                                className="pic"
                                src={API + picList[0]}
                                alt="1번사진"
                                srcset=""
                            />
                            <img
                                className="pic"
                                src={API + picList[1]}
                                alt="2번사진"
                                srcset=""
                            />
                        </div>
                        <div className="row">
                            <img
                                className="pic"
                                src={API + picList[2]}
                                alt="3번사진"
                                srcset=""
                            />
                            <img
                                className="pic"
                                src={API + picList[3]}
                                alt="4번사진"
                                srcset=""
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
            <NextStepBtn text={"출력"} func={printPhoto} />
        </>
    );
};

export default Print;
