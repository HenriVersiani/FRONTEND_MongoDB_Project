import './signup.css'
import { ToastContainer } from 'react-toastify';
import { Link } from 'react-router';
import MyCard from '../../Components/MyCardUser';
import MyCardSignup from '../../Components/MyCardSignup';

export default function SignUp() {
    return (
        <>
            <header><Link className="web-name" to="/">Perfume Store Management</Link></header>
            <main>
                <ToastContainer />
                <MyCardSignup/>
            </main>
        </>
    )
} 