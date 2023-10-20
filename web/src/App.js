import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 페이지
import Main from "./Pages/Main";
import Camera from "./Pages/Camera";
import StepLayout from "./Layouts/StepLayout";
import SelectPic from "./Pages/SelectPic";
import SelectBG from "./Pages/SelectBg";
import SelectFilter from "./Pages/SelectFilter";
import Print from "./Pages/Print";
import Convert from "./Pages/Convert";
import Fin from "./Pages/Fin";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/convert" element={<Convert />} />
                    <Route path="/fin" element={<Fin />} />
                    <Route element={<StepLayout />}>
                        <Route path="/step/1" element={<Camera />} />
                        <Route path="/step/2" element={<SelectPic />} />
                        <Route path="/step/3" element={<SelectBG />} />
                        <Route path="/step/4" element={<SelectFilter />} />
                        <Route path="/step/5" element={<Print />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
