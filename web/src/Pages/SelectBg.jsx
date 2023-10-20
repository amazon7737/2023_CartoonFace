// 라이브러리
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// 컴포넌트
import { NextStepBtn } from "../Components/Button";
// 스타일시트
import "./Styles/SelectBg.css";
// 이미지
import LogoOriginal from "../Assets/Images/logoOriginal.png";
import LogoWhite from "../Assets/Images/logoWhite.png";
import IconCheck from "../Assets/Images/check.png";

const SelectBG = () => {
    // 리액트 기본 셋팅
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // 이전 페이지에서 촬영했던 사진 목록
    const picList = useSelector((state) => state.selPicList);
    // 선택 배경 번호 관리
    const [selected, setSelected] = useState(1);
    // 다음 단계로 이동
    const nextStep = () => {
        dispatch({
            type: "SET_SEL_BG",
            payload: selected,
        });
        navigate("/convert");
    };
    // 페이지 제목 설정
    useEffect(() => {
        dispatch({
            type: "SET_PAGE_NAME",
            payload: "배경 선택",
        });
    }, []);
    return (
        <>
            <div id="selectBg">
                <div className="frameListWrap">
                    <div className="row">
                        <div
                            className={
                                selected === 1
                                    ? "frameWrap selected"
                                    : "frameWrap"
                            }
                            onClick={() => {
                                setSelected(1);
                            }}
                        >
                            <Frame type={1} picList={picList} />
                            {selected === 1 ? (
                                <div className="selectedIcon">
                                    <img src={IconCheck} alt="" srcset="" />
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                        <div
                            className={
                                selected === 2
                                    ? "frameWrap selected"
                                    : "frameWrap"
                            }
                            onClick={() => {
                                setSelected(2);
                            }}
                        >
                            <Frame type={2} picList={picList} />
                            {selected === 2 ? (
                                <div className="selectedIcon">
                                    <img src={IconCheck} alt="" srcset="" />
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                    <div className="row">
                        <div
                            className={
                                selected === 3
                                    ? "frameWrap selected"
                                    : "frameWrap"
                            }
                            onClick={() => {
                                setSelected(3);
                            }}
                        >
                            <Frame type={3} picList={picList} />
                            {selected === 3 ? (
                                <div className="selectedIcon">
                                    <img src={IconCheck} alt="" srcset="" />
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <NextStepBtn text={"배경 선택 완료"} func={nextStep} />
        </>
    );
};

const Frame = ({ type, picList }) => {
    return (
        <div className={"frame frame" + type}>
            <div className="row2">
                <img className="pic" src={picList[0]} alt="" srcset="" />
                <img className="pic" src={picList[0]} alt="" srcset="" />
            </div>
            <div className="row2">
                <img className="pic" src={picList[0]} alt="" srcset="" />
                <img className="pic" src={picList[0]} alt="" srcset="" />
            </div>
            <img
                className="logo"
                src={type === 1 ? LogoWhite : LogoOriginal}
                alt=""
                srcset=""
            />
        </div>
    );
};

export default SelectBG;
