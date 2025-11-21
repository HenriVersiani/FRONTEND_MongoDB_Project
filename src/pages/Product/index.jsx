import './product.css'
import api from '../../services/api'
import { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import MyButton from '../../Components/MyButton'
import MyInput from '../../Components/MyInput'
import Container from '../../Components/Container'

export default function Product() {

    const { id } = useParams()
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState('')
    const [nome, setNome] = useState("")
    const [preco, setPreco] = useState("")
    const [categoria, setCategoria] = useState("")
    const [imagem, setImagem] = useState(null)
    const [status, setStatus] = useState("Disponivel")
    const [genero, setGenero] = useState("")
    const [classificacao, setClassificacao] = useState("")

    const navigate = useNavigate()

    async function getProducts() {
        const productsFromApi = await api.get('/products')
        setProducts(productsFromApi.data)
    }

    async function editProduct(e) {
        e.preventDefault()

        const req = await axios.put(`http://localhost:3000/products/${id}`, {
            nome: nome,
            preco: preco,
            categoria: categoria,
            imagem: imagem,
            status: status,
            genero: genero,
            classificacao: classificacao,

        })

        const res = await req.data

        if (res.error) {
            toast.warning(res.error)
        } else {
            toast.success("Product Edited!")
            setTimeout(() => {
                navigate("/products");
            }, 2000)
        }
    }

    useEffect(() => {
        async function getProductById() {
            const req = await axios.get(`http://localhost:3000/products/${id}`)

            const res = req.data

            setProduct(res.idProduto)
            setNome(res.nome)
            setCategoria(res.categoria)
            setClassificacao(res.classificacao)
            setGenero(res.genero)
            setImagem(res.imagem)
            setPreco(res.preco)
        }
        getProductById()
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
            <h1> Product </h1>
            <ToastContainer />
            <Container>
                <MyButton buttonClass="button-medium button-blue" buttonHandle={() => navigate("/products")} buttonTitle=" ← Back" />
                <form >
                    <h1>Edit Product</h1>
                    <MyInput inputClass="input-medium" inputHandle={({ target }) => setNome(target.value)} inputPlaceholder="Name" inputType="text" inputValue={nome} />
                    <MyInput inputClass="input-medium" inputHandle={({ target }) => setPreco(target.value)} inputPlaceholder="Price" inputType="number" inputValue={preco} />
                    <MyInput inputClass="input-medium" inputHandle={({ target }) => setCategoria(target.value)} inputPlaceholder="Category" inputType="text" inputValue={categoria} />
                    {imagem && typeof imagem === "string" && (
                        <img
                            src={imagem}
                            alt="Imagem atual"
                            className="preview-img"
                        />
                    )}
                    <MyInput
                        inputClass="input-medium"
                        inputType="file"
                        inputHandle={({ target }) => {
                            const file = target.files[0];
                            if (file) {
                                const preview = URL.createObjectURL(file);  // <<< vira string!
                                setImagem(preview);
                            }
                        }}
                    />


                    <select className="select-product" value={genero} onChange={({ target }) => { setGenero(target.value) }}>
                        <option>Select Gender</option>
                        <option value="Women">Women</option>
                        <option value="Men">Men</option>
                        <option value="Any">Any</option>
                    </select>
                    <select className="select-product" value={classificacao} onChange={({ target }) => { setClassificacao(target.value) }}>
                        <option>Select Class</option>
                        <option value="Women">Adult</option>
                        <option value="Men">Children</option>
                        <option value="Children">Any</option>
                    </select>
                    <MyButton buttonClass="button-green button-small" buttonHandle={(e) => editProduct(e)} buttonTitle="Edit" />
                </form>
            </Container>
        </>
    )
}