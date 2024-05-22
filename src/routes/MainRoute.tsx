import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import GoogleNav from "../pages/google-nav/GoogleNav";
import MaterioNav from "../pages/materio-nav/Index";

function MainRoute() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/google-nav" element={<GoogleNav />} />
      <Route path="/materio-nav" element={<MaterioNav />} />
    </Routes>
  );
}

export default MainRoute;
