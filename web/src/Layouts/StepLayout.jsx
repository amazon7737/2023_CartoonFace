import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import "./Styles/Layout.css";
import { useState } from "react";

const StepLayout = () => {
    const [title, setTitle] = useState("");
    const [cnt, setCnt] = useState(-1);
    return (
        <div className="layout step">
            <Header title={title} cnt={cnt} />
            <div id="content">
                <Outlet setTitle={setTitle} setCnt={setCnt} />
            </div>
            <Footer />
        </div>
    );
};

export default StepLayout;
