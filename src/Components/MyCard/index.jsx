import { useNavigate } from 'react-router'
import MyButton from '../MyButton'
import './card.css'
import api from '../../services/api'
import { toast } from 'react-toastify'
import { useState } from 'react'
import MyInput from '../MyInput'
import axios from 'axios'

export default function MyCard({ cardType, cardClass, cardParams }) {

    const navigate = useNavigate()

    if (cardType === "users") {

        const { nome, email, areaOcupacao, _id } = cardParams

        async function deleteUser(id) {
            const response = await api.delete(`/users/${id}`)

            if (response.data.error) {
                toast.warning(response.data.error);
            } else {
                toast.success("User Deleted!");
            }
            setTimeout(() => {
                navigate(0);
            }, 2000)
        }

        return (
            <div className={cardClass}>
                <div className='card-info'>
                    <div className='info'>
                        <h3>Name</h3>
                        <p className='nome'>{nome}</p>
                    </div>
                    <div className='info'>
                        <h3>Email:</h3>
                        <p className='email'>{email}</p>
                    </div>
                    <div className='info'>
                        <h3>Ocupation Area:</h3>
                        <p className='area-ocupacao'>{areaOcupacao}</p>
                    </div>
                </div>
                <div className='buttons'>
                    <MyButton buttonClass="button-red button-small" buttonTitle="Delete" buttonHandle={() => deleteUser(_id)} />
                    <MyButton buttonClass="button-blue button-small" buttonTitle="Edit" buttonHandle={() => navigate(`/seller/${_id}`)} />
                </div>
            </div>)
    }
    if (cardType === "sales") {

        const { _id, idProduto, idVendedor, metodoPagamento, precoVenda } = cardParams

        async function deleteSale(id) {
            const response = await api.delete(`/vendas/${id}`)

            if (response.data.error) {
                toast.warning(response.data.error);
            } else {
                toast.success("Sale Deleted!");
            }
            setTimeout(() => {
                navigate(0);
            }, 2000)
        }


        return (
            <div className={cardClass}>
                <div className='card-info'>
                    <div className='info'>
                        <h3>Id:</h3>
                        <p className='area-ocupacao'>{_id}</p>
                    </div>

                    <div className='info'>
                        <h3>Product Id:</h3>
                        <p className='nome'>{idProduto}</p>
                    </div>

                    <div className='info'>
                        <h3>Seller Id:</h3>
                        <p className='email'>{idVendedor}</p>
                    </div>

                    <div className='info'>
                        <h3>Payment Method:</h3>
                        <p className='area-ocupacao'>{metodoPagamento}</p>
                    </div>

                    <div className='info'>
                        <h3>Sell Price:</h3>
                        <p className='area-ocupacao'>{precoVenda}</p>
                    </div>
                </div>
                <div className='buttons'>
                    <MyButton buttonClass="button-red button-small" buttonHandle={() => deleteSale(_id)} buttonTitle="Delete" />
                    <MyButton buttonClass="button-blue button-small" buttonHandle={() => navigate(`/sale/${_id}`)} buttonTitle="Edit" />
                </div>
            </div>

        )
    }
    if (cardType === "products") {

        const { nome, categoria, genero, preco, status, _id, imagem } = cardParams

        return (
            <div className={cardClass}>
                <div className='card-info'>
                    <div className='info'><h3>Name:</h3><p>{nome}</p></div>
                    <div className='info'><h3>Categoria:</h3><p>{categoria}</p></div>
                    <div className='info'><h3>Gênero:</h3><p>{genero}</p></div>
                    <div className='info'><h3>Preço:</h3><p>{preco}</p></div>
                    <div className='info'><h3>Status:</h3><p>{status}</p></div>
                    <div className='info'><h3>Id:</h3><p>{_id}</p></div>
                </div>
                <img src={imagem} alt="Product Image" className='img-product' />
                <div className='buttons'>
                    <MyButton buttonClass="button-red button-small" buttonTitle="Delete" buttonHandle={() => deleteProduct(_id)} />
                    <MyButton buttonClass="button-blue button-small" buttonTitle="Edit" buttonHandle={() => navigate(``)} />
                </div>
            </div>
        )
    }
    if (cardType === "signup") {

        const [nome, setNome] = useState()
        const [telefone, setTelefone] = useState()
        const [area, setArea] = useState()
        const [email, setEmail] = useState()
        const [senha, setSenha] = useState()
        const navigate = useNavigate();

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
                    <MyButton buttonClass="button-lightblue button-medium" buttonHandle={(e) => cadastrarUsuario(e)} buttonTitle="SignUp" />
                    <MyButton buttonClass="button-lightblue button-small" buttonHandle={() => navigate("/")} buttonTitle="Login" />
                </form>
            </div>
        )
    }
    return (
        <>
        </>
    )
}