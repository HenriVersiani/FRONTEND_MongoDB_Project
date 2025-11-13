import './users.css'
import api from '../../services/api'
import { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import { useNavigate } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
import { FiSearch } from "react-icons/fi";
import { CiDesktopMouse1 } from 'react-icons/ci'
import MyButton from '../../Components/MyButton'
import MyCard from '../../Components/MyCard'
import MyInput from '../../Components/MyInput'
import Title from '../../Components/Title'


export default function Users() {

    const [users, setUsers] = useState([])
    const [userName, setUserName] = useState([])
    const navigate = useNavigate()

    async function getUsers() {
        const usersFromApi = await api.get('/users')
        setUsers(usersFromApi.data)
    }

    async function getUsersByName(e) {
        e.preventDefault()
        const userByName = await api.get(`/users/nome/${userName}`)
        setUsers(userByName.data)
    }

    useEffect(() => {
        getUsers()

        console.log(users)

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
            <Title>Teste</Title>
            <div className='title-search'>
                <h1> Sellers </h1>
                <div className='search'>
                    <MyInput inputClass="input-large" inputHandle={({ target }) => { setUserName(target.value); }} inputPlaceholder="Search" inputType="search" inputValue={userName}/>
                    <MyButton buttonClass="button-blue small" buttonHandle={(e) => getUsersByName(e)} buttonTitle={<FiSearch />}/>
                </div>
            </div>

                <div>
                    {users.map(user => (
                        <div key={user.id} className='container'>
                            <MyCard cardClass="card-medium" cardType="users" cardParams={user}/>
                        </div>

                    ))}
                </div>
        </>
    )
}
 