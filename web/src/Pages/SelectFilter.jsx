import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles/SelectFilter.css";
import { NextStepBtn } from "../Components/Button";
import ImgPlaceholder from "../Assets/Images/imgPlaceholder.png";
import IconCheck from "../Assets/Images/check.png";

const SelectFilter = () => {
    const navigate = useNavigate();
    const nextStep = () => {
        navigate("/step/5");
    };
    const [selected, setSelected] = useState(1);
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
