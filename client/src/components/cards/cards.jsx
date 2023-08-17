import Card from '../card/card';
import './cards.css'

function Cards(props) {
    const {receta} = props;
    console.log(receta)
return(
    <div className='contenedor-cards'>
        {receta.map((ele)=>(
            
            <Card
            key={ele.id}
            id={ele.id}
            name={ele.name}
            diets={ele.diets.join(', ')}
            image={ele.image}
            healthScore={ele.healthScore}
            />
        ))  
        }
        
    </div>
)
}

export default Cards;