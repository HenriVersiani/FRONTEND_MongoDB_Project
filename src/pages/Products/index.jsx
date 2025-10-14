import './style.css'
import api from '../../services/api'
import { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import { useNavigate } from 'react-router'


export default function Products() {

    const [products, setProducts] = useState([])
    const navigate = useNavigate()

    async function getProducts() {
        const productsFromApi = await api.get('/products')
        setProducts(productsFromApi.data)
    }

    useEffect(() => {
        getProducts()
        const tokenLocal = localStorage.getItem('token');
        const emailLocal = localStorage.getItem('email');

        if (!tokenLocal) {
            navigate("/")
        } 

    }, [])

    console.log(products)

    return (
        <>
            <Header />
            <h1> Products </h1>
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