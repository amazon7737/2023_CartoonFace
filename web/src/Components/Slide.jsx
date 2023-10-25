// 라이브러리
import { useEffect, useState } from "react";
import axios from "axios";
// 스타일 시트
import "./Styles/Slide.css";

const Slide = () => {
    //API서버 주소
    const API = "http://localhost:3001";
    const [imgList1, setImgList1] = useState([]);
    const [imgList2, setImgList2] = useState([]);
    const [imgList3, setImgList3] = useState([]);
    const getPic = async () => {
        const response = await axios.get(API + "/recent");
        console.log(response.data.data.convert);
        let temp = response.data.data.convert[0];
        await shuffle(temp);
        console.log(temp);
        setImgList1(temp);
        await shuffle(temp);
        console.log(temp);
        setImgList2(temp);
        await shuffle(temp);
        console.log(temp);
        setImgList3(temp);
    };
    const shuffle = async (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    useEffect(() => {
        getPic();
    }, []);
    return (
        <div id="slide">
            <div className="col">
                {imgList1.map((img, idx) => (
                    <img src={img} alt="" />
                ))}
                {imgList1.map((img, idx) => (
                    <img src={img} alt="" />
                ))}
            </div>
            <div className="col">
                {imgList2.map((img, idx) => (
                    <img src={img} alt="" />
                ))}
                {imgList2.map((img, idx) => (
                    <img src={img} alt="" />
                ))}
            </div>
            <div className="col">
                {imgList3.map((img, idx) => (
                    <img src={img} alt="" />
                ))}
                {imgList3.map((img, idx) => (
                    <img src={img} alt="" />
                ))}
            </div>
        </div>
    );
};

export default Slide;
