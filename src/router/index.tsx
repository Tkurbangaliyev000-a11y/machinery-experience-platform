import { HashRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Showroom from "../pages/Showroom/Showroom";
import MachineViewer from "../components/MachineViewer/MachineViewer";

export default function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<MachineViewer />} />
        <Route path="/catalog/:page" element={<MachineViewer />} />
        <Route path="/showroom" element={<Showroom />} />
      </Routes>
    </HashRouter>
  );
}