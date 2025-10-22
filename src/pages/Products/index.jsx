import './style.css'
import api from '../../services/api'
import { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import { Link, useNavigate } from 'react-router'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'

export default function Products() {

    const [products, setProducts] = useState([])
    const [nome, setNome] = useState("")
    const [preco, setPreco] = useState("")
    const [categoria, setCategoria] = useState("")
    const [imagem, setImagem] = useState(null)
    const [status, setStatus] = useState("Disponivel")
    const [genero, setGenero] = useState("")
    const [classificacao, setClassificacao] = useState("")
    const [showForm, setShowForm] = useState(false)

    const navigate = useNavigate()

    async function getProducts() {
        const productsFromApi = await api.get('/products')
        setProducts(productsFromApi.data)
    }

    async function createProduct(e) {
        e.preventDefault()

        let imageUrl = ""

        if (imagem) {
            const formData = new FormData()
            formData.append("image", imagem)

            const imgbbApiKey = "d345d40546abe58bf622c91ca3c57470"
            const uploadResponse = await axios.post(
                `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
                formData
            )

            imageUrl = uploadResponse.data.data.display_url
        }

        const req = await axios.post('http://localhost:3000/products', {
            nome,
            preco: Number(preco),
            categoria,
            imagem: imageUrl,
            status,
            genero,
            classificacao,
        })

        const res = await req.data

        console.log(res)

        if (res.error) {
            toast.warning(res.error)
        } else {
            toast.success("Product Created")
            setTimeout(() => {
                setShowForm(false)
                navigate(0);
            }, 2000)
        }
    }

    useEffect(() => {
        getProducts()
        const tokenLocal = localStorage.getItem('token')
        if (!tokenLocal) {
            navigate("/")
        }
    }, [])

    return (
        <>
            <Header />
            <h1> Products </h1>
            <ToastContainer/>
            {showForm ? (
                <div className='container'>
                    <button className='link-form-back' onClick={() => setShowForm(false)}> ← Back</button>
                    <form className='form-product' onSubmit={createProduct}>
                        <h1>Add Product</h1>
                        <input type="text" placeholder='Name' value={nome} onChange={({ target }) => setNome(target.value)} />
                        <input type="text" placeholder='Price' value={preco} onChange={({ target }) => setPreco(target.value)} />
                        <input type="text" placeholder='Category' value={categoria} onChange={({ target }) => setCategoria(target.value)} />

                        <input type="file" onChange={({ target }) => setImagem(target.files[0])} />

                        <select className="select-sale" value={genero} onChange={({ target }) => { setGenero(target.value) }}>
                                <option>Select Gender</option>
                                <option value="Women">Women</option>
                                <option value="Men">Men</option>
                                <option value="Any">Any</option>
                        </select>
                        <select className="select-sale" value={classificacao} onChange={({ target }) => { setClassificacao(target.value) }}>
                                <option>Select Class</option>
                                <option value="Adult">Adult</option>
                                <option value="Children">Children</option>
                                <option value="Any">Any</option>
                        </select>

                        <button className='button-signup' type='submit'>Add</button>
                    </form>
                </div>
            ) : (
                <div>
                    <div className='main'>
                        <button className='link-form' onClick={() => setShowForm(true)}>Add Product</button>
                    </div>
                    {products.map(product => (
                        <div key={product.id} className='container'>
                            <div className='card'>
                                <div className='info'><h3>Name:</h3><p>{product.nome}</p></div>
                                <div className='info'><h3>Categoria:</h3><p>{product.categoria}</p></div>
                                <div className='info'><h3>Gênero:</h3><p>{product.genero}</p></div>
                                <div className='info'><h3>Preço:</h3><p>{product.preco}</p></div>
                                <div className='info'><h3>Status:</h3><p>{product.status}</p></div>
                                <div className='info'><h3>Id:</h3><p>{product._id}</p></div>
                                <img src={product.imagem} alt="Product Image" />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}
