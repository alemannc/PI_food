import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../../redux/actions';
import { Link } from 'react-router-dom';
import "./detail.css"


function Detail() {
  const { id } = useParams();

  const recipe = useSelector(state => state.recipe);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipeById(id));
  }, [dispatch, id]);

  if (!recipe) {
    return <div>No se encontró la Receta con el ID: {id}</div>;
  }

  const { name, image, summary, healthScore, steps, diets } = recipe;

  return (

    <div className='containerDetail'>
      <h1>{name}</h1>
      <img src={image} alt="bandera" className='img' />
      <div className='text-container'>
        <h3 className='h3-title'>ID:</h3>
        <p className='text-p'>{id}</p>
      </div>

      <div className='text-container'>
        <h3 className='h3-title'>
          Resumen del Plato: 
        </h3>
        <p className='text-p'>{summary}</p>
      </div>
      <div className='text-container'>
        <h3>
          Nivel de comida saludable :
        </h3>
        <p className='text-p'>{healthScore}</p>
      </div>
      <div className='text-container'>
        <h3>
           Paso a paso: 
        </h3>
        <p className='text-p'>{steps}</p>
      </div>
      <div className='text-container'>
        <h3>
           Tipos de dieta: 
        </h3>
        <p className='text-p'>{diets && diets.length > 0 ? diets.join(', ') : 'N/A'}</p>
      </div>
      <Link to="/home">
        <button className='button-detail'>Home</button>
      </Link>
    </div>
  );
}

export default Detail;
