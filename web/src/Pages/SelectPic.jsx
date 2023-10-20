// 라이브러리
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// 컴포넌트
import { NextStepBtn } from "../Components/Button";
// 스타일시트
import "./Styles/SelectPic.css";
// 이미지
import ImgPlaceholder from "../Assets/Images/imgPlaceholder.png";
import IconArrowLeft from "../Assets/Images/arrowLeft.png";
import IconArrowRight from "../Assets/Images/arrowRight.png";

const SelectPic = () => {
    // 리액트 기본 셋팅
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // 이전 페이지에서 촬영했던 사진 목록
    const pictures = useSelector((state) => state.picList);
    // 선택 사진 목록
    const [selectedPics, setSelectedPics] = useState([]);
    // 사진 목록 슬라이드
    const [currentIdx, setCurrentIdx] = useState(0);
    // 다음 단계로 이동
    const nextStep = () => {
        dispatch({
            type: "SET_SEL_PIC_LIST",
            payload: [...selectedPics],
        });
        navigate("/step/3");
    };
    // 이전 이미지 보기
    const prevImg = () => {
        if (currentIdx > 0) {
            setCurrentIdx(currentIdx - 1);
        }
    };
    // 다음 이미지 보기
    const nextImg = () => {
        if (currentIdx < 7) {
            setCurrentIdx(currentIdx + 1);
        }
    };
    // 사진 선택하기
    const selectPic = (pic) => {
        if (selectedPics.length >= 1) {
            window.alert("사진은 1장만 선택할 수 있습니다.");
        } else {
            setSelectedPics([...selectedPics, pic]);
        }
    };
    // 사진 선택 취소하기
    const deletePic = (idx) => {
        const temp = selectedPics;
        temp.splice(idx, 1);
        setSelectedPics([...temp]);
    };
    // 페이지 제목 설정
    useEffect(() => {
        dispatch({
            type: "SET_PAGE_NAME",
            payload: "사진 선택",
        });
    }, []);
    // 사진 목록 슬라이드 제어
    useEffect(() => {
        const target = document.getElementById("target");
        target.style.transform = `translate(${-currentIdx * 229}px, 0px)`;
    }, [currentIdx]);
    return (
        <>
            <div id="selectPic">
                <div className="selectedPicWrap">
                    <SelectedPic picList={selectedPics} func={deletePic} />
                </div>
                <div className="listPicWrap">
                    <ListPic picList={pictures} func={selectPic} />
                    <div className="slideBtn prev" onClick={prevImg}>
                        <img src={IconArrowLeft} alt="이전" srcset="" />
                    </div>
                    <div className="slideBtn next" onClick={nextImg}>
                        <img src={IconArrowRight} alt="다음" srcset="" />
                    </div>
                </div>
            </div>
            <NextStepBtn
                text={"사진 선택 완료"}
                func={nextStep}
                disable={selectedPics.length >= 1 ? false : true}
            />
        </>
    );
};

const SelectedPic = ({ picList, func }) => {
    return (
        <div className="selectedPic">
            <img
                className="placeHolder"
                src={picList[0] === undefined ? ImgPlaceholder : picList[0]}
                onClick={() => {
                    func(0);
                }}
                alt="1번 사진"
            />
        </div>
    );
};

const ListPic = ({ picList, func }) => {
    return (
        <div id="target" className="listPic">
            {picList.map((pic, idx) => (
                <img
                    className="placeHolder"
                    src={pic}
                    onClick={() => {
                        func(pic);
                    }}
                    alt={`${idx + 1}번 사진`}
                />
            ))}
        </div>
    );
};

export default SelectPic;
