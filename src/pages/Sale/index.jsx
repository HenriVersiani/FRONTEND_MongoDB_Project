import './sale.css'
import api from '../../services/api'
import { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import MyButton from '../../Components/MyButton'
import MyInput from '../../Components/MyInput'
import Container from '../../Components/Container'

export default function Sale() {

    const { id } = useParams()

    const [products, setProducts] = useState([])
    const [users, setUsers] = useState([])

    const [product, setProduct] = useState('')
    const [seller, setSeller] = useState('')
    const [price, setPrice] = useState('')
    const [method, setMethod] = useState('')

    const navigate = useNavigate()

    async function getProducts() {
        const productsFromApi = await api.get('/products')
        setProducts(productsFromApi.data)
    }

    async function getUsers() {
        const usersFromApi = await api.get('/users')
        setUsers(usersFromApi.data)
    }

    async function editSale(e) {
        e.preventDefault()

        const req = await axios.put(`http://localhost:3000/vendas/${id}`, {
            idProduto: product,
            idVendedor: seller,
            precoVenda: price,
            metodoPagamento: method,
        })

        const res = await req.data

        if (res.error) {
            toast.warning(res.error)
        } else {
            toast.success("Sale Edited!")
            setTimeout(() => {
                navigate("/sales");
            }, 2000)
        }
    }

    useEffect(() => {
        async function getSaleById() {
            const req = await axios.get(`http://localhost:3000/vendas/${id}`)

            const res = req.data

            setProduct(res.idProduto)
            setSeller(res.idVendedor)
            setPrice(res.precoVenda)
            setMethod(res.metodoPagamento)

        }
        getSaleById()
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
            <Container>
                <MyButton buttonClass="button-medium button-blue" buttonHandle={() => navigate("/sales")} buttonTitle=" ← Back"/>
                <form className='form-sale' onSubmit={(e) => editSale(e)}>

                    <h1>Edit Sale</h1>
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

                    <MyButton buttonClass="button-green button-medium" buttonTitle="Edit"/>
                </form>
            </Container>
        </>
    )
}