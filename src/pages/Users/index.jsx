import './style.css'
import api from '../../services/api'
import { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import { useNavigate } from 'react-router'


export default function Users() {

    const [users, setUsers] = useState([])
    const [userName, setUserName] = useState([])
    const navigate = useNavigate()

    async function getUsers() {
        const usersFromApi = await api.get('/users')
        setUsers(usersFromApi.data)
    }

    console.log(userName)

    async function getUsersByName() {
        const userByName = await api.get(`/users/nome/${userName}`)
        setUsers(userByName.data)

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
            <Header />
            <div className='title-search'>
                <h1> Sellers </h1>
                <input className='input-search' name="input-search" type="search" placeholder='Search' value={userName} onChange={({ target }) => { setUserName(target.value); }} />
                <button type='button' onClick={getUsersByName}>Lupa</button>
            </div>
            {users.map(user => (
                <div key={user.id} className='container'>
                    <div className='card'>
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
                </div>
            ))}

            <div className='container'>

            </div>
        </>
    )
}