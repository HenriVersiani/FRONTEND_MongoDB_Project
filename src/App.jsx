import { Route, Routes } from "react-router";
import Users from "./pages/Users";
import Login from "./pages/Home";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";



export default function App() {
    return (
        <Routes>
            <Route path="/a" element={<Home />}></Route>
            <Route path="/users" element={<Users />}></Route>
            <Route path="/" element={<Dashboard/>}></Route>
        </Routes>
    )
}