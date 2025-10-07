import { Route, Routes } from "react-router";
import Users from "./pages/Users";
import Login from "./pages/Home";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";



export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/users" element={<Users />}></Route>
            <Route path="/dashboard" element={<Dashboard/>}></Route>
            <Route path="/signup" element={<SignUp/>}></Route>
        </Routes>
    )
}