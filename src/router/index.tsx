import { HashRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Showroom from "../pages/Showroom/Showroom";

export default function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/showroom" element={<Showroom />} />
      </Routes>
    </HashRouter>
  );
}