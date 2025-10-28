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
            toast.success("User Deleted!");
        }
        setTimeout(() => {
            navigate(0);
        }, 2000)
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
                                    <button className='button-edit' onClick={() => navigate(`/seller/${user._id}`)}>Edit</button>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
        </>
    )
}
