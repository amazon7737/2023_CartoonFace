import "./Styles/Button.css";

const NextStepBtn = ({ text, func }) => {
    return (
        <div className="nextStepBtn" onClick={func}>
            {text}
        </div>
    );
};

const ChangeBtn = ({ text, func }) => {
    return (
        <div className="changeBtn" onClick={func}>
            {text}
        </div>
    );
};

export { NextStepBtn, ChangeBtn };
