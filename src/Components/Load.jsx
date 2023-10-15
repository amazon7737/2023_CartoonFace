import React from "react";
import "./Styles/Load.css";

// 1페이지
const First = ({ talk, title, subTitle, link }) => {
  return (
    <a href={link}>
      <div className="wrap">
        <div className="first-container">
          <div className="title">
            <div className="main-title">{title}</div>
            <div className="subTitle">{subTitle}</div>
          </div>

          <div className="text">
            <label style={{ textDecoration: "none" }}>{talk}</label>
          </div>
        </div>
        <div className="rect" />
      </div>
    </a>
  );
};

export default First;
