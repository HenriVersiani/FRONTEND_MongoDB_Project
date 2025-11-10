import './card.css'

export default function MyCard({ cardTitle, cardElements, cardClass }){
    return(
            <div className={cardClass}>
                {cardElements}
            </div>
    )
}