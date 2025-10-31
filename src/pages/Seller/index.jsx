import { useNavigate, useParams } from "react-router"
import Header from "../../Components/Header"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import './seller.css'

export default function Seller() {

    const { id } = useParams()
    const navigate = useNavigate()
    const [nome, setNome] = useState('')
    const [telefone, setTelefone] = useState('')
    const [area, setArea] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    useEffect(() => {
        async function getUserById() {
            const req = await axios.get(`http://localhost:3000/users/${id}`)

            const res = req.data
            console.log(res)

            setNome(res.nome)
            setEmail(res.email)
            setArea(res.areaOcupacao)
            setTelefone(res.numeroTelefone)
            setSenha(res.senha)
        }
        getUserById()
    }, [])

    async function editUser(e) {

        console.log("entrou")

        e.preventDefault()

        const req = await axios.put(`http://localhost:3000/users/${id}`, {
            nome: nome,
            email: email,
            senha: senha,
            numeroTelefone: telefone,
            areaOcupacao: area
        })

        const res = await req.data

        if (res.error) {
            toast.warning(res.error)
        } else {
            toast.success("Seller Edited!")
            setTimeout(() => {
                navigate("/sellers");
            }, 2000)
        }
    }

    return (
        <>
            <Header />
            <ToastContainer/>
            <div className='container'>
                <form >
                    <h1>Edit Seller</h1>
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
                    <button className='button-signup' onClick={(e) => editUser(e)}>Edit</button>
                </form>
            </div>

        </>
    )
}