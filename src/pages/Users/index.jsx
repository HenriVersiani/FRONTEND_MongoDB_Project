import './style.css'
import api from '../../services/api'
import { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import { useNavigate } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
import { FiSearch } from "react-icons/fi";
import { CiDesktopMouse1 } from 'react-icons/ci'


export default function Users() {

    const [users, setUsers] = useState([])
    const [userName, setUserName] = useState([])
    const [editForm, setEditForm] = useState(false)
    const [nome, setNome] = useState('')
    const [telefone, setTelefone] = useState('')
    const [area, setArea] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [seller, setSeller] = useState('')
    const navigate = useNavigate()

    async function getUsers() {
        const usersFromApi = await api.get('/users')
        setUsers(usersFromApi.data)
    }

    async function getUsersByName() {
        const userByName = await api.get(`/users/nome/${userName}`)
        setUsers(userByName.data)
    }

    async function deleteUser(id) {
        const response = await api.delete(`/users/${id}`)
        console.log(response)

        if (response.data.error) {
            toast.warning(response.data.error);
        } else {
            toast.success("Usuário deletado com sucesso!");
        }
        setTimeout(() => {
            navigate(0);
        }, 2000)
    }
    async function editUser(e) {
        e.preventDefault()

        const req = await axios.put(`http://localhost:3000/users/${seller}`, {
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
            toast.success("Sale Created")
            setTimeout(() => {
                setEditForm(false)
                navigate(0);
            }, 2000)
        }
    }

    useEffect(() => {
        getUsers()

        const tokenLocal = localStorage.getItem('token');
        const emailLocal = localStorage.getItem('email');

        if (!tokenLocal) {
            navigate("/")
        }

    }, [])

    return (
        <>
            <ToastContainer />
            <Header />
            <div className='title-search'>
                <h1> Sellers </h1>
                <div className='search'>
                    <input className='input-search' name="input-search" type="search" placeholder='Search' value={userName} onChange={({ target }) => { setUserName(target.value); }} />
                    <button type='button' onClick={getUsersByName} className='button'><FiSearch /></button>
                </div>
            </div>

            {editForm ? (
                <div className='container'>
                    <form >
                        <button className='link-form-back' onClick={() => setEditForm(false)}> ← Back</button>
                        <h1>Edit Seller</h1>
                        <select className="select-sale" value={seller} onChange={({ target }) => { setSeller(target.value) }}>
                            <option>Select Seller</option>
                            {users.map(user => (
                                <option key={user._id} value={user._id}>{user.nome}</option>
                            ))}
                        </select>
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
                        <button className='button-signup' onClick={editUser}>Edit</button>
                    </form>
                </div>

            ) : (
                <div>
                    {users.map(user => (
                        <div key={user.id} className='container'>
                            <div className='card'>
                                <div className='card-info'>
                                    <div className='info'>
                                        <h3>Name:</h3>
                                        <p className='nome'>{user.nome}</p>
                                    </div>
                                    <div className='info'>
                                        <h3>Email:</h3>
                                        <p className='email'>{user.email}</p>
                                    </div>
                                    <div className='info'>
                                        <h3>Ocupation Area:</h3>
                                        <p className='area-ocupacao'>{user.areaOcupacao}</p>
                                    </div>
                                </div>
                                <div className='buttons'>
                                    <button className='button-delete' onClick={() => deleteUser(user._id)}>Delete</button>
                                    <button className='button-edit' onClick={() => setEditForm(true)}>Edit</button>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            )}
        </>
    )
}
