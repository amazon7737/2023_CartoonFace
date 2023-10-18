// 라이브러리
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// 컴포넌트
import { NextStepBtn } from "../Components/Button";
// 스타일시트
import "./Styles/SelectFilter.css";
// 이미지
import ImgPlaceholder from "../Assets/Images/imgPlaceholder.png";
import IconCheck from "../Assets/Images/check.png";

const SelectFilter = () => {
    // 리액트 기본 셋팅
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // 선택 필터 번호 관리
    const [selected, setSelected] = useState(1);
    // 필터 목록
    const filterList = [
        "face_paint_512_v1",
        "face_paint_512_v2",
        "celeba_distill",
        "paprika",
        "arcane",
    ];
    // 다음 단계로 이동
    const nextStep = () => {
        dispatch({
            type: "SET_SEL_FILTER",
            payload: filterList[selected - 1],
        });
        navigate("/convert");
    };
    // 페이지 제목 설정
    useEffect(() => {
        dispatch({
            type: "SET_PAGE_NAME",
            payload: "필터 선택",
        });
    }, []);
    return (
        <>
            <div id="selectFilter">
                <div className="filterListWrap">
                    <div className="row">
                        <div
                            className={
                                selected === 1
                                    ? "filterWrap selected"
                                    : "filterWrap"
                            }
                            onClick={() => {
                                setSelected(1);
                            }}
                        >
                            <Filter
                                thumb={ImgPlaceholder}
                                name={"필터 1"}
                                subName={"Face Paint v1"}
                            />
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
                                    ? "filterWrap selected"
                                    : "filterWrap"
                            }
                            onClick={() => {
                                setSelected(2);
                            }}
                        >
                            <Filter
                                thumb={ImgPlaceholder}
                                name={"필터 2"}
                                subName={"Face Paint v2"}
                            />
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
                                    ? "filterWrap selected"
                                    : "filterWrap"
                            }
                            onClick={() => {
                                setSelected(3);
                            }}
                        >
                            <Filter
                                thumb={ImgPlaceholder}
                                name={"필터 3"}
                                subName={"Celeba Distill"}
                            />
                            {selected === 3 ? (
                                <div className="selectedIcon">
                                    <img src={IconCheck} alt="" srcset="" />
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                        <div
                            className={
                                selected === 4
                                    ? "filterWrap selected"
                                    : "filterWrap"
                            }
                            onClick={() => {
                                setSelected(4);
                            }}
                        >
                            <Filter
                                thumb={ImgPlaceholder}
                                name={"필터 4"}
                                subName={"Paprika"}
                            />
                            {selected === 4 ? (
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
                                selected === 5
                                    ? "filterWrap selected"
                                    : "filterWrap"
                            }
                            onClick={() => {
                                setSelected(5);
                            }}
                        >
                            <Filter
                                thumb={ImgPlaceholder}
                                name={"필터 5"}
                                subName={"Arcane"}
                            />
                            {selected === 5 ? (
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
            <NextStepBtn text={"필터 선택 완료"} func={nextStep} />
        </>
    );
};

const Filter = ({ thumb, name, subName }) => {
    return (
        <div className="filter">
            <img className="thumb" src={thumb} alt="" srcset="" />
            <div className="info">
                <div className="name">{name}</div>
                <div className="subName">{subName}</div>
            </div>
        </div>
    );
};

export default SelectFilter;
