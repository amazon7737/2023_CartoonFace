import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import "./Styles/Three.css";
import Footer from "./Footer";

const Three = () => {
  /**
   * 해야할것
   * * 카드 슬라이드 모션 작업
   * * 선택한 사진 눌렀을때 0번째 빈공간으로 추가되는 버그 발생
   *
   */

  const apiUrl = `/recent`;

  // 선택할 사진리스트
  const [ImageList, setImageList] = useState([]);

  // 선택한 사진
  const [Image, setImage] = useState("");

  // 선택된 사진리스트
  const [SelectedList, setSelectedList] = useState([0, 0, 0, 0]);

  // 이미지 받기
  const ImagetoMe = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}`);
      console.log("따끈", data.data.original[0]);

      setImageList(data.data.original[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // 함수 실행할때는 {} 를 꼭 붙여줘야 한다 -> destroy is not function
  useEffect(() => {
    ImagetoMe();
    setImageList([]);
  }, []);

  // console.log("??", ImageList);
  console.log("??", SelectedList);

  // 선택할 사진 뿌리기
  let ImgData = ImageList.map((detail, index) => {
    return (
      <>
        <img
          className="img"
          src={detail}
          onClick={() => {
            setImage(detail);
          }}
        />
      </>
    );
  });

  // 선택된 사진들 배열에 추가
  const selectFunction = () => {
    let tempList = [];
    if (SelectedList.length == 4) {
      let tempList = [...SelectedList.slice(1), Image];
      setSelectedList(tempList);
    } else {
      let tempList = [...SelectedList, Image];
      setSelectedList(tempList);
    }

    // let tempList = [...ImageData];
    // console.log("@@@:", tempList);
    // setSelectedList(tempList);
  };

  // 선택된 사진 뿌리기
  let SelectedData = SelectedList.map((detail, index) => {
    return (
      <img className="selectedImg" src={detail} width="320px" height="320px" />
    );
  });

  useEffect(() => {
    selectFunction(Image);
  }, [Image]);

  return (
    <>
      <Header title={"사진 선택"} />
      <div className="container">
        <div className="selected-container">
          <div className="selImg">{SelectedData}</div>
        </div>
        <div className="select-container">
          <div className="wimg">{ImgData}</div>
        </div>
      </div>
      <div className="foot-container">
        <Footer />
      </div>
    </>
  );
};

export default Three;
