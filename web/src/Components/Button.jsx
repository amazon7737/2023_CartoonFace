import "./Styles/Button.css";

const NextStepBtn = ({ text, func, disable }) => {
    return (
        <>
            {disable ? (
                <div className="nextStepBtn disable">{text}</div>
            ) : (
                <div className="nextStepBtn" onClick={func}>
                    {text}
                </div>
            )}
        </>
    );
};

const ChangeBtn = ({ text, func }) => {
    return (
        <div className="changeBtn" onClick={func}>
            {text}
        </div>
    );
};

const LargeBtn = ({ text }) => {
    return <div className="largeBtn">{text}</div>;
};

export { NextStepBtn, ChangeBtn, LargeBtn };
