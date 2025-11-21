import { useNavigate } from 'react-router'
import MyButton from '../MyButton'
import './product.css'
import api from '../../services/api'
import { toast } from 'react-toastify'
import { useState } from 'react'
import MyInput from '../MyInput'
import axios from 'axios'

export default function MyCardProduct({ cardParams }) {

    const navigate = useNavigate()

    async function deleteProduct(id) {
        const response = await api.delete(`/products/${id}`)

        if (response.data.error) {
            toast.warning(response.data.error);
        } else {
            toast.success("Product Deleted!");
        }
        setTimeout(() => {
            navigate(0);
        }, 2000)
    }

    const { nome, categoria, genero, preco, status, _id, imagem } = cardParams

    return (
        <div className="product">
            <div className='card-info'>
                <div className='info'><h3>Name:</h3><p>{nome}</p></div>
                <div className='info'><h3>Categoria:</h3><p>{categoria}</p></div>
                <div className='info'><h3>Gênero:</h3><p>{genero}</p></div>
                <div className='info'><h3>Preço:</h3><p>{preco}</p></div>
                <div className='info'><h3>Status:</h3><p>{status}</p></div>
                <div className='info'><h3>Id:</h3><p>{_id}</p></div>
            </div>
            <img src={imagem} alt="Product Image" className='img-product' />
            <div className='buttons'>
                <MyButton buttonClass="button-red button-small" buttonTitle="Delete" buttonHandle={() => deleteProduct(_id)} />
                <MyButton buttonClass="button-blue button-small" buttonTitle="Edit" buttonHandle={() => navigate(`/product/${_id}`)} />
            </div>
        </div>
    )
}

