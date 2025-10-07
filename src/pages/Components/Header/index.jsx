import { Link } from "react-router";
import { FiAlignCenter } from "react-icons/fi";
import './style.css'

export default function Header() {
    return(
        <header>
            <h1>Nome Site</h1>
            <nav>
                <Link className="link" to="/estoque">Estoque</Link>
                <Link className="link" to="/cadastrar">Cadastrar</Link>
                <Link className="link" to="/vendas">Vendas</Link>
                <Link className="link" to="/vendedores">Vendedores</Link>
                
                <FiAlignCenter />
            </nav>
        </header>
    )
}