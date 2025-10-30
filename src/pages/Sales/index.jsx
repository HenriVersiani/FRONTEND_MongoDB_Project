import './style.css'
import api from '../../services/api'
import { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'

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
                            <input type="number" placeholder='Selling Price' value={price} onChange={({ target }) => { setPrice(target.value) }} />
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
                                <div className='card'>
                                    <div className='card-info'>
                                        <div className='info'>
                                            <h3>Id:</h3>
                                            <p className='area-ocupacao'>{sale._id}</p>
                                        </div>

                                        <div className='info'>
                                            <h3>Product Id:</h3>
                                            <p className='nome'>{sale.idProduto}</p>
                                        </div>

                                        <div className='info'>
                                            <h3>Seller Id:</h3>
                                            <p className='email'>{sale.idVendedor}</p>
                                        </div>

                                        <div className='info'>
                                            <h3>Payment Method:</h3>
                                            <p className='area-ocupacao'>{sale.metodoPagamento}</p>
                                        </div>

                                        <div className='info'>
                                            <h3>Sell Price:</h3>
                                            <p className='area-ocupacao'>{sale.precoVenda}</p>
                                        </div>
                                    </div>
                                    <div className='buttons'>
                                        <button className='button-delete' onClick={() => deleteUser(user._id)}>Delete</button>
                                        <button className='button-edit' onClick={() => navigate(`/seller/${user._id}`)}>Edit</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            <div className='container'>

            </div>
        </>
    )
}