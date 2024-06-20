import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Signup from "./Pages/Signup/Signup";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/Signup" element={<Signup />} />
            </Routes>
        </BrowserRouter>
    );
}