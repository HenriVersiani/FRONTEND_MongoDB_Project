import './Mybutton.css'

export default function MyButton({ buttonClass, buttonTitle, buttonHandle }){
    return(
            <button className={buttonClass} onClick={buttonHandle}>{buttonTitle}</button>
    )
}