import { Routes, Route } from "react-router";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import "./styles/app.scss";
function App() {
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="main-frame">
        <div className="topbar"></div>
        <Routes>
          <Route index element={<Main />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
