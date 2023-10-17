import "./Styles/Header.css";

const Header = ({ title, cnt }) => {
    return (
        <div id="header">
            <div className="title">페이지 제목</div>
            {0 > -1 ? (
                <div className="info">
                    남은 횟수
                    <strong>0/8</strong>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Header;
