import { Link } from 'react-router-dom';
import './navBar.css';
import SearchBar from "../searchBar/searchBar"
import {setOrderAZ,setOrderZA,resetOrder,healthScoreASC,healthScoreDESC,filterFromDB,filterFromAPI,setFilter} from "../../redux/actions"
import { useDispatch,   } from "react-redux";

function Navbar() {

  const dispatch = useDispatch();
  function handleOrderChange(e) {
    e.preventDefault()
    const order = e.target.value;
    if (order === "A-Z") {
      dispatch(setOrderAZ());
    } else if (order === "Z-A") {
      dispatch(setOrderZA());
    }else if (order === "all") {
      dispatch(resetOrder());
    }else if (order === "ASC") {
      dispatch(healthScoreASC());
    }else if (order === "DESC") {
      dispatch(healthScoreDESC());
    }
  }

  function handleFilterChange(e){
    e.preventDefault()
    const filter = e.target.value;
    if (filter === "api") {
      dispatch(filterFromDB());
    } else if (filter === "bd") {
      dispatch(filterFromAPI());
    }else if (filter === "all") {
      dispatch(resetOrder());
    }else{
      dispatch(setFilter(filter))
    }
  }

  return (
    <nav className="nav-container">
      <div className="filter-container">
        <select className="select" name="" id="" onChange={handleFilterChange}> 
        <option value="" disabled selected hidden>Filtrar</option>
          <option value="all">Reset</option>
          <option value="api">Api</option>
          <option value="bd">BD</option>
          <option value="gluten free">Gluten free</option>
          <option value="dairy free">Dairy free</option>
          <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="paleolithic">Paleolithic</option>
          <option value="primal">Primal</option>
          <option value="whole 30">Whole 30</option>
        </select>

        <select className="select" name="" id="" onChange={handleOrderChange}>
          <option value="" disabled selected hidden>Ordenar</option>
          <option value="all">Reset</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="ASC">Healt Score ASC</option>
          <option value="DESC">Healt Score DEC</option>
        </select>
        <SearchBar></SearchBar>
        <Link to="/form">
            <button className="recipe-container">Crea tu propia receta!!</button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
