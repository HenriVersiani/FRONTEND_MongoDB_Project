import { Link } from "react-router";
import { FiAlignCenter } from "react-icons/fi";
import './header.css'
import { FaBluetoothB } from "react-icons/fa";
import MyButton from "../MyButton";


export default function Header() {
    return(
        <header>
            <Link className="web-name" to="/">Perfume Store Management</Link>
            <nav>
                <Link className="link" to="/signup">Register</Link>
                <Link className="link" to="/deposit">Deposit</Link>
                <Link className="link" to="/sales">Sales</Link>
                <Link className="link" to="/sellers">Sellers</Link>
                <MyButton buttonClass="button-green button-medium" buttonTitle="Teste"/>
                <FiAlignCenter />
            </nav>
        </header>
    )
}