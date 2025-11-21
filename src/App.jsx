import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import Products from "./pages/Products";
import Sales from "./pages/Sales";
import Seller from "./pages/Seller";
import Sale from "./pages/Sale";
import Sellers from "./pages/Sellers";
import Product from "./pages/Product";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/sellers" element={<Sellers />}></Route>
            <Route path="/seller/:id" element={<Seller />}></Route>
            <Route path="/dashboard" element={<Dashboard/>}></Route>
            <Route path="/signup" element={<SignUp/>}></Route>
            <Route path="/products" element={<Products/>}></Route>
            <Route path="product/:id" element={<Product/>}></Route>
            <Route path="/sales" element={<Sales/>}></Route>
            <Route path="/sale/:id" element={<Sale/>}></Route>
        </Routes>
    )
}