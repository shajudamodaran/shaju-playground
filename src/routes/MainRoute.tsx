import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import GoogleNav from "../pages/google-nav/GoogleNav";

function MainRoute() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/google-nav" element={<GoogleNav />} />
    </Routes>
  );
}

export default MainRoute;
