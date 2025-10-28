import { Route, Routes } from "react-router";
import Users from "./pages/Users";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import Products from "./pages/Products";
import Sales from "./pages/Sales";
import Seller from "./pages/Seller";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/sellers" element={<Users />}></Route>
            <Route path="/seller/:id" element={<Seller />}></Route>
            <Route path="/dashboard" element={<Dashboard/>}></Route>
            <Route path="/signup" element={<SignUp/>}></Route>
            <Route path="/deposit" element={<Products/>}></Route>
            <Route path="/sales" element={<Sales/>}></Route>
        </Routes>
    )
}