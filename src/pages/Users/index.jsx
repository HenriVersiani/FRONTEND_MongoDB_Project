import './style.css'
import api from '../../services/api'
import { useEffect, useState } from 'react'
import Header from '../Components/Header'


export default function Users() {

    const [users, setUsers] = useState([])

    async function getUsers() {
        const usersFromApi = await api.get('/users')
        setUsers(usersFromApi.data)
    }

    useEffect(() => {
        getUsers()
    }, [])



    return (
        <>
            <Header />
            <h1> Users </h1>
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