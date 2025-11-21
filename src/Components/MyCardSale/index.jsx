import { useNavigate } from 'react-router'
import MyButton from '../MyButton'
import './sales.css'
import api from '../../services/api'
import { toast } from 'react-toastify'

export default function MyCardSales({ cardParams }) {

    const navigate = useNavigate()

    const { _id, idProduto, idVendedor, metodoPagamento, precoVenda } = cardParams

    async function deleteSale(id) {
        const response = await api.delete(`/vendas/${id}`)

        if (response.data.error) {
            toast.warning(response.data.error);
        } else {
            toast.success("Sale Deleted!");
        }
        setTimeout(() => {
            navigate(0);
        }, 2000)
    }

        return (
            <div className='sales'>
                <div className='card-info'>
                    <div className='info'>
                        <h3>Id:</h3>
                        <p className='area-ocupacao'>{_id}</p>
                    </div>

                    <div className='info'>
                        <h3>Product Id:</h3>
                        <p className='nome'>{idProduto}</p>
                    </div>

                    <div className='info'>
                        <h3>Seller Id:</h3>
                        <p className='email'>{idVendedor}</p>
                    </div>

                    <div className='info'>
                        <h3>Payment Method:</h3>
                        <p className='area-ocupacao'>{metodoPagamento}</p>
                    </div>

                    <div className='info'>
                        <h3>Sell Price:</h3>
                        <p className='area-ocupacao'>{precoVenda}</p>
                    </div>
                </div>
                <div className='buttons'>
                    <MyButton buttonClass="button-red button-small" buttonHandle={() => deleteSale(_id)} buttonTitle="Delete" />
                    <MyButton buttonClass="button-blue button-small" buttonHandle={() => navigate(`/sale/${_id}`)} buttonTitle="Edit" />
                </div>
            </div>
        )
    }


