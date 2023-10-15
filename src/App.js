import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Second from "./Components/Second";
import Three from "./Components/Three";
import Four from "./Components/Four";

import Upload from "./Components/Upload";
import Footer from "./Components/Footer";
import Load from "./Components/Load";
import PrintImage from "./Components/PrintImage";

/**
 * 해야할것 : 기능 동작에 관해서는 후순위로 두고 일단 전체적인 모습을 완성하자.
 * 1. UI먼저
 * 2. 기능단 차근히 다시
 * 3. component , page 분리
 * 4. 버그 찾기
 *
 */

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Load
                talk={"화면을 터치해주세요"}
                link={"/2"}
                title={"프로젝트명"}
                subTitle={"서브 타이틀"}
              />
            }
          />
          <Route path="/2" element={<Second />} />
          <Route path="/3" element={<Three />} />
          <Route path="/4" element={<Four />} />
          <Route
            path="/imageTrans"
            element={
              <Load
                talk={"잠시만 기다려주세요."}
                title={"이미지 변환중"}
                subTitle={"인공지능이 열심히 그리고 있어요."}
              />
            }
          />

          <Route path="/PrintImage" element={<PrintImage />} />
          <Route
            path="/imagePrint"
            element={
              <Load
                talk={"잠시만 기다려주세요."}
                title={"사진 출력중"}
                subTitle={"사진이 출력하는 중입니다."}
              />
            }
          />
          <Route
            path="/result"
            element={
              <Load
                talk={"N초 후 초기화면으로 전환됩니다."}
                title={"프로젝트명"}
                subTitle={"이용해주셔서 감사합니다."}
              />
            }
          />

          {/* 연습 */}
          <Route path="/upload" element={<Upload />} />
          <Route path="/test" element={<Footer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
