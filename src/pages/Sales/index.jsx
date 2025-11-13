import './sales.css'
import api from '../../services/api'
import { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import MyButton from '../../Components/MyButton'
import MyInput from '../../Components/MyInput'
import MyCard from '../../Components/MyCard'

export default function Sales() {

    const [sales, setSales] = useState([])
    const [products, setProducts] = useState([])
    const [users, setUsers] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [product, setProduct] = useState('')
    const [seller, setSeller] = useState('')
    const [price, setPrice] = useState('')
    const [method, setMethod] = useState('')
    const navigate = useNavigate()

    async function getSales() {
        const salesFromApi = await api.get('/vendas')
        setSales(salesFromApi.data)
    }

    async function getProducts() {
        const productsFromApi = await api.get('/products')
        setProducts(productsFromApi.data)
    }

    async function getUsers() {
        const usersFromApi = await api.get('/users')
        setUsers(usersFromApi.data)
    }

    async function createSale(e) {
        e.preventDefault()

        const req = await axios.post('http://localhost:3000/vendas', {
            idProduto: product,
            idVendedor: seller,
            precoVenda: price,
            metodoPagamento: method,
        })

        const res = await req.data

        if (res.error) {
            toast.warning(res.error)
        } else {
            toast.success("Sale Created")
            setTimeout(() => {
                setShowForm(false)
                navigate(0);
            }, 2000)
        }

    }

    useEffect(() => {
        getSales()
        getProducts()
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
            <h1> Sales </h1>
            <ToastContainer />
            {showForm ?
                (
                    <div className='container'>
                        <button className='link-form-back' onClick={() => setShowForm(false)}> ← Back</button>
                        <form className='form-sale' onSubmit={createSale}>

                            <h1>Add Sale</h1>
                            <select className="select-sale" value={product} onChange={({ target }) => { setProduct(target.value) }}>
                                <option>Select Product</option>
                                {products.map(product => (
                                    <option key={product._id} value={product._id}>{product.nome}</option>
                                ))}
                            </select>
                            <select className="select-sale" value={seller} onChange={({ target }) => { setSeller(target.value) }}>
                                <option>Select Seller</option>
                                {users.map(user => (
                                    <option key={user._id} value={user._id}>{user.nome}</option>
                                ))}
                            </select>
                            <MyInput inputClass="input-medium" inputHandle={({ target }) => { setPrice(target.value) }} inputPlaceholder="Selling Price" inputType="number" inputValue={price} />
                            <select className="select-sale" value={method} onChange={({ target }) => { setMethod(target.value) }}>
                                <option>Select Payment Method</option>
                                <option value="Credit_Card">Credit Card</option>
                                <option value="Debit_Card">Debit Card</option>
                                <option value="PayPal">PayPal</option>
                            </select>

                            <button className='button-signup' type='submit'>Add</button>
                        </form>
                    </div>
                ) :
                (
                    <div>
                        <div className='main'>
                            <button className='link-form' onClick={() => setShowForm(true)}>Add Sale</button>
                        </div>
                        {sales.map(sale => (
                            <div key={sale.id} className='container'>

                                <MyCard cardClass="card-medium" cardParams={sale} cardType="sales" />

                            </div>
                        ))}
                    </div>
                )}
            <div className='container'>

            </div>
        </>
    )
}