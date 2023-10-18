import { forwardRef } from "react";

import "./Styles/Result.css";
// 이미지
import LogoOriginal from "../Assets/Images/logoOriginalLarge.png";
import LogoWhite from "../Assets/Images/logoWhiteLarge.png";
import ImgPlaceholder from "../Assets/Images/imgPlaceholder.png";

// const Result = forwardRef((props, ref) => {
//     return (
//         <div className={"result frame" + props.type} ref={ref}>
//             <div className="imgWrap" style={{ top: "32px", left: "32px" }}>
//                 <img
//                     className="pic"
//                     src={
//                         props.picList[0]
//                             ? props.api + props.picList[0]
//                             : ImgPlaceholder
//                     }
//                     alt="1번사진"
//                     srcset=""
//                 />
//             </div>
//             <div className="imgWrap">
//                 <img
//                     className="pic"
//                     src={
//                         props.picList[1]
//                             ? props.api + props.picList[1]
//                             : ImgPlaceholder
//                     }
//                     alt="2번사진"
//                     srcset=""
//                 />
//             </div>
//             <div className="imgWrap">
//                 <img
//                     className="pic"
//                     src={
//                         props.picList[2]
//                             ? props.api + props.picList[2]
//                             : ImgPlaceholder
//                     }
//                     alt="3번사진"
//                     srcset=""
//                 />
//             </div>
//             <div className="imgWrap">
//                 <img
//                     className="pic"
//                     src={
//                         props.picList[3]
//                             ? props.api + props.picList[3]
//                             : ImgPlaceholder
//                     }
//                     alt="4번사진"
//                     srcset=""
//                 />
//             </div>
//             <div className="logo">
//                 <img
//                     src={props.type === 1 ? LogoWhite : LogoOriginal}
//                     alt="로고"
//                     srcset=""
//                 />
//             </div>
//         </div>
//     );
// });

const Result = forwardRef((props, ref) => {
    return (
        <div className={"result frame" + props.type} ref={ref}>
            <table>
                <tr>
                    <td style={{ minWidth: "32px" }}></td>
                    <td></td>
                    <td style={{ minWidth: "24px" }}></td>
                    <td></td>
                    <td style={{ minWidth: "32px" }}></td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <div className="imgWrap">
                            <img
                                className="pic"
                                src={
                                    props.picList[0]
                                        ? props.api + props.picList[0]
                                        : ImgPlaceholder
                                }
                                alt="1번사진"
                                srcset=""
                            />
                        </div>
                    </td>
                    <td></td>
                    <td>
                        <div className="imgWrap">
                            <img
                                className="pic"
                                src={
                                    props.picList[0]
                                        ? props.api + props.picList[0]
                                        : ImgPlaceholder
                                }
                                alt="1번사진"
                                srcset=""
                            />
                        </div>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <div className="imgWrap">
                            <img
                                className="pic"
                                src={
                                    props.picList[0]
                                        ? props.api + props.picList[0]
                                        : ImgPlaceholder
                                }
                                alt="1번사진"
                                srcset=""
                            />
                        </div>
                    </td>
                    <td></td>
                    <td>
                        <div className="imgWrap">
                            <img
                                className="pic"
                                src={
                                    props.picList[0]
                                        ? props.api + props.picList[0]
                                        : ImgPlaceholder
                                }
                                alt="1번사진"
                                srcset=""
                            />
                        </div>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                </tr>
            </table>
        </div>
    );
});

export default Result;
