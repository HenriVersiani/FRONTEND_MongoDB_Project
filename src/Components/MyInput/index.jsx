import './input.css'

export default function MyInput({ inputClass, inputPlaceholder, inputType, inputValue, inputHandle }){
    return(
            <input type={inputType} className={inputClass} placeholder={inputPlaceholder} value={inputValue} onChange={inputHandle} />
    )
}