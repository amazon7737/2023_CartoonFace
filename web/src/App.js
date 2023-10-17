import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 페이지
import Main from "./Pages/Main";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
