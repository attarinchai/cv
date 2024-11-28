import React from "react";
import { Routes, Route } from "react-router";
import MainPage from "./Main_page";
import WelcomePage from "./Welcome_page";

function App(){
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/main" element={<MainPage />} />
    </Routes>
  );
}

export default App;