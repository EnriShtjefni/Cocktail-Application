import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import UserSelectionPage from "./components/UserSelectionPage/UserSelectionPage";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { UserProvider } from "./UserContext";
import UserProfilePage from "./components/UserProfilePage/UserProfilePage";
import NotFound from "./components/ErrorPage/NotFound";
import GeneralError from "./components/ErrorPage/GeneralError";

function App() {
  return (
    <UserProvider>
      <Router>
        <GeneralError>
          <Navbar />
          <Routes>
            <Route path="/" element={<UserSelectionPage />} />
            <Route path="/home/:userId" element={<HomePage />} />
            <Route path="/user/:userId" element={<UserProfilePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </GeneralError>
      </Router>
      <Footer />
    </UserProvider>
  );
}

export default App;
