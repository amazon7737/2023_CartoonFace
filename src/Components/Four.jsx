import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./Styles/Four.css";

const Four = () => {
  return (
    <>
      <Header title={"배경 선택"} />
      <div className="four-container"></div>
      <div className="foot-container">
        <Footer />
      </div>
    </>
  );
};

export default Four;
