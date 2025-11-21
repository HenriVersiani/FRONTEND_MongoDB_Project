import { useNavigate } from 'react-router'
import MyButton from '../MyButton'
import './signup.css'
import { toast } from 'react-toastify'
import { useState } from 'react'
import MyInput from '../MyInput'
import axios from 'axios'

export default function MyCardSignup() {

        const navigate = useNavigate()
        const [nome, setNome] = useState()
        const [telefone, setTelefone] = useState()
        const [area, setArea] = useState()
        const [email, setEmail] = useState()
        const [senha, setSenha] = useState()

        async function cadastrarUsuario(e) {

            e.preventDefault()

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

        return (
            <div>
                <form >
                    <h1>Sign Up</h1>
                    <MyInput inputClass="input-medium" inputHandle={({ target }) => setNome(target.value)} inputPlaceholder="Name" inputType="text" inputValue={nome} />
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
                    <MyButton buttonClass="button-green button-medium" buttonHandle={(e) => cadastrarUsuario(e)} buttonTitle="SignUp" />
                    <MyButton buttonClass="button-lightblue button-small" buttonHandle={() => navigate("/")} buttonTitle="Login" />
                </form>
            </div>
        )
    
    return (
        <>
        </>
    )


}
