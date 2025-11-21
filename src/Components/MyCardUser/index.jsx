import { useNavigate } from 'react-router'
import MyButton from '../MyButton'
import './card.css'
import api from '../../services/api'
import { toast } from 'react-toastify'

export default function MyCardUsers({ cardParams }) {

    const navigate = useNavigate()

        const { nome, email, areaOcupacao, _id } = cardParams

        async function deleteUser(id) {
            const response = await api.delete(`/users/${id}`)

            if (response.data.error) {
                toast.warning(response.data.error);
            } else {
                toast.success("User Deleted!");
            }
            setTimeout(() => {
                navigate(0);
            }, 2000)
        }

        return (
            <div className="users">
                <div className='card-info'>
                    <div className='info'>
                        <h3>Name</h3>
                        <p className='nome'>{nome}</p>
                    </div>
                    <div className='info'>
                        <h3>Email:</h3>
                        <p className='email'>{email}</p>
                    </div>
                    <div className='info'>
                        <h3>Ocupation Area:</h3>
                        <p className='area-ocupacao'>{areaOcupacao}</p>
                    </div>
                </div>
                <div className='buttons'>
                    <MyButton buttonClass="button-red button-small" buttonTitle="Delete" buttonHandle={() => deleteUser(_id)} />
                    <MyButton buttonClass="button-blue button-small" buttonTitle="Edit" buttonHandle={() => navigate(`/seller/${_id}`)} />
                </div>
            </div>)
    }
    