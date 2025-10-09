import { Link } from "react-router";
import { FiAlignCenter } from "react-icons/fi";
import './style.css'

export default function Header() {
    return(
        <header>
            <Link className="web-name" to="/">Perfume Store Management</Link>
            <nav>
                <Link className="link" to="/estoque">Deposit</Link>
                <Link className="link" to="/cadastrar">Register</Link>
                <Link className="link" to="/vendas">Sales</Link>
                <Link className="link" to="/vendedores">Sellers</Link>
                
                <FiAlignCenter />
            </nav>
        </header>
    )
}