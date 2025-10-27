import { useState } from 'react'
import Header from '../../Components/Header'
import './style.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router';

export default function SignUp() {

    const [nome, setNome] = useState()
    const [telefone, setTelefone] = useState()
    const [area, setArea] = useState()
    const [email, setEmail] = useState()
    const [senha, setSenha] = useState()
    const navigate = useNavigate();

    async function cadastrarUsuario() {

        const req = await axios.post('http://localhost:3000/users', {
            "nome": nome,
            "email": email,
            "areaOcupacao": area,
            "numeroTelefone": Number(telefone),
            "senha": senha
        })

        const res = await req.data

        if (res.error) {
            toast.warning(res.error)
        } else {
            toast.success("User Created")

            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);
        }
    }

    function redirect(){
        navigate("/")
    }

    return (
        <>
            <header><Link className="web-name" to="/">Perfume Store Management</Link></header>
            <main>
                <ToastContainer />
                <form >
                    <h1>Sign Up</h1>
                    <input className='input-signup' type="text" placeholder='Name' value={nome} onChange={({ target }) => setNome(target.value)} />
                    <input className='input-signup' type="tel" placeholder='Phone' value={telefone} onChange={({ target }) => setTelefone(target.value)} />
                    <select className="select-sale" value={area} onChange={({ target }) => { setArea(target.value) }}>
                                <option>Select Area</option>
                                <option value="Women">Women</option>
                                <option value="Men">Men</option>
                                <option value="Children">Children</option>
                                <option value="Any">Any</option>
                    </select>
                    <input className='input-signup' type="email" placeholder='Email' value={email} onChange={({ target }) => setEmail(target.value)} />
                    <input className='input-signup' type="password" placeholder='Password' value={senha} onChange={({ target }) => setSenha(target.value)} />

                    <button className="button-signup" type='button' onClick={cadastrarUsuario}>Sign Up</button>
                    <button type='button' className='button-login-red' onClick={redirect}>LogIn</button>
                </form>
            </main>
        </>
    )
}