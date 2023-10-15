import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import "./Styles/Second.css";

const Second = () => {
  const apiUrl = `/send`;

  const videoRef = useRef(null);

  const [filterO, setfilter] = useState("");
  const video = document.getElementById("videoCam");
  const canvas = document.getElementById("canvas");
  const [CanvasState, setCanvasState] = useState("none"); //사
  const [CameraState, setCameraState] = useState(""); //사

  // 사진 촬영 횟수
  const [count, setCount] = useState(0);

  useEffect(() => {
    getWebcam((stream) => {
      videoRef.current.srcObject = stream;
    });
  }, []);

  const getWebcam = (callback) => {
    try {
      const constraints = {
        video: true,
        audio: false,
      };
      navigator.mediaDevices.getUserMedia(constraints).then(callback);
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };

  function GoToCamera(target) {
    // 다시 촬영
    const context = canvas.getContext("2d");
    context.scale(-1, 1); // 좌우 반전
    context.translate(-1024, 0); // 좌우 반전
    context.drawImage(video, 0, 0, "1024", "768");
    setCanvasState("none");
    setCameraState("");
    getWebcam((stream) => {
      videoRef.current.srcObject = stream;
    });
  }

  function screenShot(target) {
    setCount(count + 1);
    // 카메라 촬영
    setCanvasState(""); // 켄버스 켜기
    setCameraState("none"); //비디오 끄기
    const video = document.getElementById("videoCam");
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    context.scale(-1, 1); // 좌우 반전
    context.translate(-1024, 0); // 좌우 반전
    context.drawImage(video, 0, 0, "1024", "768");
    canvas.toBlob((blob) => {
      //캔버스의 이미지를 파일 객체로 만드는 과정
      let file = new File([blob], "fileName.jpg", { type: "image/jpeg" });
      const uploadFile = [file]; //이미지 객체
    }, "image/jpeg");

    const image = canvas.toDataURL(); // 이미지 저장하는 코드
    // 데이터 담기
    const link = document.createElement("a");
    link.href = image;

    // 데이터 받는 부분
    const data = apiToImage(image);
    console.log(data);

    // link.download = "PaintJS[🎨]";
    // link.click();

    const s = videoRef.current.srcObject;
    s.getTracks().forEach((track) => {
      track.stop();
    });
  }

  // -----------

  // 이미지 전송 api
  const apiToImage = async (link) => {
    let formData = new Object();
    formData = {
      file: link,
    };

    console.log("1!!", formData);
    try {
      const { data } = await axios.post(`${apiUrl}`, formData);
      return data;
    } catch (error) {
      return error;
    }
  };

  // 8번 찍었을때 창넘어가기
  useEffect(() => {
    if (count == 8) {
      window.location.href = "/3";
    }
  }, [count]);

  return (
    <>
      <div className="wrap2">
        <Header title={"사진 촬영"} count={count} />
        <div className="camera" style={{ width: "1024px", height: "768px" }}>
          <div
            style={{
              position: "absolute",
              zIndex: "100",
              width: "1024px",
              backgroundColor: "white",
            }}
          >
            <video
              id="videoCam"
              ref={videoRef}
              autoPlay
              style={{
                display: CameraState,
                borderRadius: "4px",
                width: "1024px",
                height: "768px",
                webkitTransform: "rotateY(180deg)",
              }}
            />

            <canvas
              id="canvas"
              width="1024px"
              height="768px"
              style={{ display: CanvasState }}
            ></canvas>
            {CanvasState === "none" ? (
              <div
                onClick={screenShot}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "70px",
                  height: "70px",
                  margin: "10px",
                  borderRadius: "100px",
                  position: "absolute",
                  zIndex: "101",
                  bottom: "5%",
                  left: "46%",
                  cursor: "pointer",
                  backgroundColor: "white",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    width: "60px",
                    height: "60px",
                    border: "2px solid",
                    borderRadius: "100px",
                  }}
                ></div>
              </div>
            ) : (
              <div
                onClick={GoToCamera}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "70px",
                  height: "70px",
                  margin: "10px",
                  borderRadius: "10px",
                  position: "absolute",
                  zIndex: "101",
                  bottom: "5%",
                  left: "46%",
                  cursor: "pointer",
                  backgroundColor: "white",
                }}
              >
                <p>다시 촬영</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="foot-container">
        <Footer />
      </div>
    </>
  );
};

export default Second;
