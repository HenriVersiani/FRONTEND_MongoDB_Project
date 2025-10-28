import { Link } from "react-router";
import { FiAlignCenter } from "react-icons/fi";
import './style.css'
import { FaBluetoothB } from "react-icons/fa";


export default function Header() {
    return(
        <header>
            <Link className="web-name" to="/">Perfume Store Management</Link>
            <nav>
                <Link className="link" to="/signup">Register</Link>
                <Link className="link" to="/deposit">Deposit</Link>
                <Link className="link" to="/sales">Sales</Link>
                <Link className="link" to="/sellers">Sellers</Link>
                
                <FiAlignCenter />
            </nav>
        </header>
    )
}