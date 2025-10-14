import './style.css'
import api from '../../services/api'
import { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import { useNavigate } from 'react-router'


export default function Sales() {

    const [sales, setSales] = useState([])
    const navigate = useNavigate()

    async function getSales() {
        const salesFromApi = await api.get('/vendas')
        setSales(salesFromApi.data)
    }

    useEffect(() => {
        getSales()

        const tokenLocal = localStorage.getItem('token');
        const emailLocal = localStorage.getItem('email');

        if (!tokenLocal) {
            navigate("/")
        } 
    }, [])

console.log(sales)

    return (
        <>
            <Header />
            <h1> Sales </h1>
            {sales.map(sale => (
                <div key={sale.id} className='container'>
                    <div className='card'>

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
                </div>
            ))}

            <div className='container'>

            </div>
        </>
    )
}