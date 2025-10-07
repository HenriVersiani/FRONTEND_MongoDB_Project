import { useState } from 'react'
import Header from '../Components/Header'
import './style.css'
import axios from 'axios'

export default function SignUp() {

    const [nome, setNome] = useState()
    const [telefone, setTelefone] = useState()
    const [area, setArea] = useState()
    const [email, setEmail] = useState()
    const [senha, setSenha] = useState()

    async function cadastrarUsuario() {

            const req = await axios.post('http://localhost:3000/users', {
                "nome": nome,
                "email": email,
                "areaOcupacao": area,
                "numeroTelefone": Number(telefone),
                "senha": senha
            })
    
        const res = await req.data
        console.log(res)
    }

    return (
        <>
            <Header />
            <form >
                <input type="text" placeholder='Name' value={nome} onChange={({ target }) => setNome(target.value)} />
                <input type="tel" placeholder='Phone' value={telefone} onChange={({ target }) => setTelefone(target.value)} />
                <input type="text" placeholder='Ocupation Area' value={area} onChange={({ target }) => setArea(target.value)} />
                <input type="email" placeholder='Email' value={email} onChange={({ target }) => setEmail(target.value)} />
                <input type="password" placeholder='Password' value={senha} onChange={({ target }) => setSenha(target.value)} />

                <button type='button' onClick={cadastrarUsuario}>Sign Up</button>
            </form>
        </>
    )
}