import React from "react";
import "./Styles/Header.css";

const Header = ({ title, count }) => {
  console.log("!!!", count);

  // 2번 페이지만 출력
  if (count != undefined) {
    return (
      <div className="Header">
        <div className="text-container">
          <div className="title">{title}</div>
          <div className="count">남은횟수 {count}/8</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="Header">
        <div className="text-container">
          <div className="title">{title}</div>
        </div>
      </div>
    );
  }
};

export default Header;
