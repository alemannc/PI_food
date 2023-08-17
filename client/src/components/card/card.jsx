import { useNavigate } from 'react-router-dom'
import './card.css'

function Card (props){

    const navigate=useNavigate()
    function navigateHandler() {
        navigate(`/detail/${props.id}`)
     }
    return(
        <div onClick={navigateHandler} className='carContainer'>

            <img src={props.image } alt="comida "  />
            <h1 >{props.name}</h1>
            <h2>{props.diets}</h2>
            <h2>{props.healthScore}</h2>
        </div>
    )

}


export default Card;