import './style.css'
import api from '../../services/api'
import { useRef } from 'react'

export default function Home() {

  const users = []

  const inputEmail = useRef()
  const inputPassword = useRef()

  async function loginUser() {
    await api.post('/users/login',
      {
        email: inputEmail.current.value,
        senha: inputPassword.current.value
      })
  }

  return (
    <>
      <div className='container'>
        <form className='form-login'>
          <h1>User Login</h1>
          <input name="email" type="email" placeholder='Email' ref={inputEmail} />
          <input name="password" type="password" placeholder='Password' ref={inputPassword} />
          <button type='button' className='button-login' onClick={loginUser}>Login</button>
          <button type='button' className='button-signup'>SignUp</button>
        </form>
      </div>
    </>
  )
}
