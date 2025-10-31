import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router'
import { toast, ToastContainer } from 'react-toastify'
import './home.css'

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

  async function loginUser() {
    const req = await axios.post('http://localhost:3000/users/login', {
      "email": email,
      "senha": password
    })

    const res = await req.data
    console.log(res.token)

    if (res.error) {
      toast.warning(res.error)
    }

    if (res.token === 'success') {
      localStorage.setItem('token', res.token);
      localStorage.setItem('email', email);

      navigate("sellers")
    }
  }

  return (
    <>
      <header><Link className="web-name" to="/">Perfume Store Management</Link></header>
      <ToastContainer />
      <div className='container'>
        <form className='form-login'>
          <h1>User Login</h1>
          <input name="email" type="email" placeholder='Email' value={email} onChange={({ target }) => setEmail(target.value)} />
          <input name="password" type="password" placeholder='Password' value={password} onChange={({ target }) => setPassword(target.value)} />
          <button type='button' className='button-login' onClick={loginUser}>Login</button>
          <button type='button' className='button-signup-red' onClick={() => navigate("/signup")}>SignUp</button>
        </form>
      </div>
    </>
  )
}
