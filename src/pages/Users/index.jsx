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
                    <MyInput inputClass="input-large" inputHandle={({ target }) => { setUserName(target.value); }} inputPlaceholder="Search" inputType="search" inputValue={userName}/>
                    <MyButton buttonClass="button-blue small" buttonHandle={(e) => getUsersByName(e)} buttonTitle={<FiSearch />}/>
                </div>
            </div>

                <div>
                    {users.map(user => (
                        <div key={user.id} className='container'>
                            <MyCard cardClass="card-medium" cardElements={
                                <>
                                <div className='card-info'>
                                    <div className='info'>
                                        <h3>Name</h3>
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
                                    <MyButton buttonClass="button-red button-small" buttonTitle="Delete" buttonHandle={() => deleteUser(user._id)}/>
                                    <MyButton buttonClass="button-blue button-small" buttonTitle="Edit" buttonHandle={() => navigate(`/seller/${user._id}`)}/>
                                </div>
                            </>
                            }/>
                            
                        </div>

                    ))}
                </div>
        </>
    )
}
 