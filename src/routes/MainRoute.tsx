import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";

function MainRoute() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default MainRoute;
