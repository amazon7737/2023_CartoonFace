import React from "react";
import "./Styles/PrintImage.css";
import Footer from "./Footer";
import Header from "./Header";

const PrintImage = () => {
  return (
    <div>
      <Header title={"사진 출력"} />
      <div className="Print-container"></div>
      <div className="foot-container">
        <Footer />
      </div>
    </div>
  );
};

export default PrintImage;
