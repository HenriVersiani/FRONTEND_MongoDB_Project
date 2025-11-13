import './signup.css'
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router';
import MyCard from '../../Components/MyCard';

export default function SignUp() {
    return (
        <>
            <header><Link className="web-name" to="/">Perfume Store Management</Link></header>
            <main>
                <ToastContainer />
                <MyCard cardClass="card-large" cardParams='' cardType="signup" />
            </main>
        </>
    )
} 