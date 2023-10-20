// 라이브러리
import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
// 컴포넌트
import { NextStepBtn } from "../Components/Button";
// 스타일시트
import "./Styles/Camera.css";

const Camera = () => {
    // 리액트 기본 셋팅
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // 웹캠
    const webcamRef = useRef(null);
    // 캡쳐
    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setPic(imageSrc);
    }, [webcamRef]);
    // 캡쳐 상태 관리
    const [isCapture, setIsCapture] = useState(false);
    // 잔여 횟수 관리 (초기값 : 8회)
    const [remain, setReamin] = useState(1);
    // 캡쳐 사진 목록
    const [picList, setPicList] = useState([]);
    // 캡쳐 사진
    const [pic, setPic] = useState();
    // 페이지 제목 설정
    useEffect(() => {
        dispatch({
            type: "SET_PAGE_NAME",
            payload: "사진 촬영",
        });
    }, []);
    // 캡쳐된 사진 처리
    useEffect(() => {
        if (pic !== undefined) {
            setReamin(remain - 1);
            if (remain <= 1) {
                setTimeout(() => {
                    dispatch({
                        type: "SET_PIC_LIST",
                        payload: [...picList, pic],
                    });
                    navigate("/step/2");
                }, 1500);
            } else {
                setPicList([...picList, pic]);
            }
        }
    }, [pic]);
    // 캡쳐시, 타이머 처리
    useEffect(() => {
        if (isCapture) {
            setTimeout(() => {
                capture();
                setIsCapture(false);
            }, 5100);
        } else {
            if (remain > 1) {
                setIsCapture(true);
            }
        }
    }, [isCapture]);

    return (
        <>
            <div id="camera">
                <Webcam
                    ref={webcamRef}
                    style={{
                        height: "100%",
                        transform: "rotateY(180deg)",
                    }}
                    screenshotFormat="image/jpg"
                />

                {isCapture ? <Timer /> : <></>}
                {pic ? <img id="lastPic" src={pic} alt="" srcset="" /> : <></>}
            </div>
            <NextStepBtn
                text={
                    remain !== 0
                        ? `촬영하기 (${remain}회 남음)`
                        : "사진 저장중..."
                }
                func={() => {
                    setIsCapture(true);
                }}
            />
        </>
    );
};

const Timer = () => {
    const [time, setTime] = useState(5);
    useEffect(() => {
        time > 0 && setTimeout(() => setTime(time - 1), 1000);
    }, [time]);
    return <div id="timer">{time ? time : <></>}</div>;
};

export default Camera;
