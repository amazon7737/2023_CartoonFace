import "./Styles/Header.css";

const Header = ({ title }) => {
    return (
        <div id="header">
            <div className="title">{title}</div>
        </div>
    );
};

export default Header;
