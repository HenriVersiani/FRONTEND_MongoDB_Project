import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'
import './home.css'
import MyButton from '../../Components/MyButton'
import MyInput from '../../Components/MyInput'

export default function Home() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    const tokenLocal = localStorage.getItem('token');

    if(tokenLocal){
      navigate("sellers")
    }
  }, [])

  async function loginUser(e) {
    e.preventDefault()

    const req = await axios.post('http://localhost:3000/users/login', {
      "email": email,
      "senha": password
    })

    const res = await req.data

    if (res.error) {
      toast.warning(res.error)
    }

    if (res.token === 'success') {
      localStorage.setItem('token', res.token);
      localStorage.setItem('email', email);

      navigate("/sellers")
    }
  }

  return (
    <>
      <header><Link className="web-name" to="/">Perfume Store Management</Link></header>
      <ToastContainer />
      <div className='container'>
        <form className='form-login'>
          <h1>User Login</h1>
          <MyInput inputClass="input-medium" inputHandle={({ target }) => setEmail(target.value)} inputPlaceholder="Email" inputType="email" inputValue={email}/>
          <MyInput inputClass="input-medium" inputHandle={({ target }) => setPassword(target.value)} inputPlaceholder="Password" inputType="password" inputValue={password}/>
          <MyButton buttonClass="button-lightblue button-medium" buttonTitle="Login" buttonHandle={(e) => loginUser(e)}/>
          <MyButton buttonClass="button-lightblue button-small" buttonTitle="Sign-up" buttonHandle={() => navigate("/signup")}/>
        </form>
      </div>
    </>
  )
}
