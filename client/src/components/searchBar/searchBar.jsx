import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getRecipeByName,getAllRecipes } from '../../redux/actions'; // Asegúrate de importar la acción adecuada
import "./searchBar.css"

function SearchBar() {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (searchText.trim() !== '') { //Utilizamos el .trim para eliminar posibles espacios en blanco al inicio o al final de la busqueda
        console.log(searchText)
        dispatch(getRecipeByName(searchText)); // Llama a la acción con el término de búsqueda
    }
  };
  const handleReset = () => {
    setSearchText(''); // Limpiamos el campo de búsqueda
    dispatch(getAllRecipes()); // Llamamos a la acción para obtener todas las recetas nuevamente
  };

  return (
    <div className='searchBarContainer'>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Buscar recetas..."
        className='input'
      />
      <div className='buttonContainer'>

      <button onClick={handleSearch} className='search'>Buscar</button>
      <button onClick={handleReset} className='search'>Recet</button>
      </div>
    </div>
  );
}

export default SearchBar;