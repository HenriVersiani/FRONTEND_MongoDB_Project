import './style.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'


export default function Home() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  async function loginUser() {
    const req = await axios.post('http://localhost:3000/users/login', {
      "email": email,
      "senha": password
    })

    const res = await req.data
    console.log(res.token)

 if(res.token === 'success'){
    navigate("/users")
 }
  }

  return (
    <>
      <div className='container'>
        <form className='form-login'>
          <h1>User Login</h1>
          <input name="email" type="email" placeholder='Email' value={email} onChange={({ target }) => setEmail(target.value)} />
          <input name="password" type="password" placeholder='Password' value={password} onChange={({ target }) => setPassword(target.value)} />
          <button type='button' className='button-login' onClick={loginUser}>Login</button>
          <button type='button' className='button-signup'>SignUp</button>
        </form>
      </div>
    </>
  )
}
