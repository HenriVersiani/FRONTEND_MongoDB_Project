import { useNavigate, useParams } from "react-router"
import Header from "../../Components/Header"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import './seller.css'
import MyButton from "../../Components/MyButton"
import MyInput from "../../Components/MyInput"

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

            setNome(res.nome)
            setEmail(res.email)
            setArea(res.areaOcupacao)
            setTelefone(res.numeroTelefone)
            setSenha(res.senha)
        }
        getUserById()
    }, [])

    async function editUser(e) {

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
            <ToastContainer />
            <div className='container'>
                <form >
                    <h1>Edit Seller</h1>
                    <MyInput inputClass="input " inputHandle={({ target }) => setNome(target.value)} inputPlaceholder="Name" inputType="text" inputValue={nome} />
                    <MyInput inputClass="input-medium" inputHandle={({ target }) => setTelefone(target.value)} inputPlaceholder="Phone" inputType="tel" inputValue={telefone} />
                    <select className="select-sale" value={area} onChange={({ target }) => { setArea(target.value) }}>
                        <option>Select Area</option>
                        <option value="Women">Women</option>
                        <option value="Men">Men</option>
                        <option value="Children">Children</option>
                        <option value="Any">Any</option>
                    </select>
                    <MyInput inputClass="input-medium" inputHandle={({ target }) => setEmail(target.value)} inputPlaceholder="Email" inputType="email" inputValue={email} />
                    <MyInput inputClass="input-medium" inputHandle={({ target }) => setSenha(target.value)} inputPlaceholder="Password" inputType="password" inputValue={senha} />
                    <MyButton buttonClass="button-green button-small" buttonHandle={(e) => editUser(e)} buttonTitle="Edit" />
                </form>
            </div>

        </>
    )
}