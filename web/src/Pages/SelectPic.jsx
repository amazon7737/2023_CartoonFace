import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles/SelectPic.css";
import { NextStepBtn } from "../Components/Button";
import ImgPlaceholder from "../Assets/Images/imgPlaceholder.png";
import IconArrowLeft from "../Assets/Images/arrowLeft.png";
import IconArrowRight from "../Assets/Images/arrowRight.png";

const SelectPic = () => {
    const navigate = useNavigate();
    const [pictures, setPictures] = useState([
        ImgPlaceholder,
        ImgPlaceholder,
        ImgPlaceholder,
        ImgPlaceholder,
        ImgPlaceholder,
        ImgPlaceholder,
        ImgPlaceholder,
        ImgPlaceholder,
    ]);
    const [selectedPics, setSelectedPics] = useState([
        ImgPlaceholder,
        ImgPlaceholder,
        ImgPlaceholder,
        ImgPlaceholder,
    ]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const nextStep = () => {
        navigate("/step/3");
    };
    const prevImg = () => {
        if (currentIdx > 0) {
            setCurrentIdx(currentIdx - 1);
        }
    };
    const nextImg = () => {
        if (currentIdx < 7) {
            setCurrentIdx(currentIdx + 1);
        }
    };
    useEffect(() => {
        const target = document.getElementById("target");
        console.log(target.style.transform);
        target.style.transform = `translate(${-currentIdx * 229}px, 0px)`;
        console.log(target.style.transform);
    }, [currentIdx]);
    return (
        <>
            <div id="selectPic">
                <div className="selectedPicWrap">
                    <SelectedPic imgList={selectedPics} />
                </div>
                <div className="listPicWrap">
                    <ListPic imgList={pictures} />
                    <div className="slideBtn prev" onClick={prevImg}>
                        <img src={IconArrowLeft} alt="이전" srcset="" />
                    </div>
                    <div className="slideBtn next" onClick={nextImg}>
                        <img src={IconArrowRight} alt="다음" srcset="" />
                    </div>
                </div>
            </div>
            <NextStepBtn text={"사진 선택 완료"} func={nextStep} />
        </>
    );
};

const SelectedPic = ({ imgList }) => {
    return (
        <div className="selectedPic">
            <div className="row">
                <img className="placeHolder" src={imgList[0]} alt="1번 사진" />
                <img className="placeHolder" src={imgList[1]} alt="2번 사진" />
            </div>
            <div className="row">
                <img className="placeHolder" src={imgList[0]} alt="3번 사진" />
                <img className="placeHolder" src={imgList[1]} alt="4번 사진" />
            </div>
        </div>
    );
};

const ListPic = ({ imgList }) => {
    return (
        <div id="target" className="listPic">
            <img className="placeHolder" src={imgList[0]} alt="1번 사진" />
            <img className="placeHolder" src={imgList[1]} alt="2번 사진" />
            <img className="placeHolder" src={imgList[2]} alt="3번 사진" />
            <img className="placeHolder" src={imgList[3]} alt="4번 사진" />
            <img className="placeHolder" src={imgList[4]} alt="5번 사진" />
            <img className="placeHolder" src={imgList[5]} alt="6번 사진" />
            <img className="placeHolder" src={imgList[6]} alt="7번 사진" />
            <img className="placeHolder" src={imgList[7]} alt="8번 사진" />
        </div>
    );
};

export default SelectPic;
