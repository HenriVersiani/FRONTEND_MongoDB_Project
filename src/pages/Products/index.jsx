import './style.css'
import api from '../../services/api'
import { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import { Link, useNavigate } from 'react-router'
import axios from 'axios'



export default function Products() {

    const [products, setProducts] = useState([])
    const [nome, setNome] = useState([])
    const [preco, setPreco] = useState([])
    const [categoria, setCategoria] = useState([])
    const [imagem, setImagem] = useState([])
    const [status, setStatus] = useState([])
    const [genero, setGenero] = useState([])
    const [classificacao, setClassificacao] = useState([])

    const navigate = useNavigate()

    async function getProducts() {
        const productsFromApi = await api.get('/products')
        setProducts(productsFromApi.data)
    }

    async function createProduct(e) {

        e.preventDefault()

        const req = await axios.post('http://localhost:3000/products', {
            "nome": nome,
            "preco": Number(preco),
            "categoria": categoria,
            "imagem": imagem,
            "status": status,
            "genero": genero,
            "classificacao": classificacao,
        })
    }



    useEffect(() => {
        getProducts()
        const tokenLocal = localStorage.getItem('token');
        const emailLocal = localStorage.getItem('email');

        if (!tokenLocal) {
            navigate("/")
        }

    }, [])

    return (
        <>
            <Header />
            <h1> Products </h1>
            <Link>Link pro Form</Link>
            <form className='form-product'>
                <h1>Add Product</h1>
                <input type="text" placeholder='Name' value={nome} onChange={({ target }) => { setNome(target.value); }} />
                <input type="text" placeholder='Price' value={preco} onChange={({ target }) => { setPreco(target.value); }} />
                <input type="text" placeholder='Category' value={categoria} onChange={({ target }) => { setCategoria(target.value); }} />
                <input type="text" placeholder='Image' value={imagem} onChange={({ target }) => { setImagem(target.value); }} />
                <input type="text" placeholder='Status' value={status} onChange={({ target }) => { setStatus(target.value); }} />
                <input type="text" placeholder='Gender' value={genero} onChange={({ target }) => { setGenero(target.value); }} />
                <input type="text" placeholder='Class' value={classificacao} onChange={({ target }) => { setClassificacao(target.value); }} />

                <button className='button-signup' onClick={createProduct}>Add</button>
            </form>
            {products.map(product => (
                <div key={product.id} className='container'>
                    <div className='card'>

                        <div className='info'>
                            <h3>Name:</h3>
                            <p className='nome'>{product.nome}</p>
                        </div>

                        <div className='info'>
                            <h3>Categoria:</h3>
                            <p className='email'>{product.categoria}</p>
                        </div>

                        <div className='info'>
                            <h3>Gênero:</h3>
                            <p className='area-ocupacao'>{product.genero}</p>
                        </div>

                        <div className='info'>
                            <h3>Preço:</h3>
                            <p className='area-ocupacao'>{product.preco}</p>
                        </div>

                        <div className='info'>
                            <h3>Status:</h3>
                            <p className='area-ocupacao'>{product.status}</p>
                        </div>

                        <div className='info'>
                            <h3>Id:</h3>
                            <p className='area-ocupacao'>{product._id}</p>
                        </div>

                        <div className='info'>
                            <h3>Link Imagem:</h3>
                            <p className='area-ocupacao'>{product.imagem}</p>
                        </div>

                    </div>
                </div>
            ))}
        </>
    )
}