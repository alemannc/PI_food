import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes } from "../../redux/actions"; // Asegúrate de proporcionar la ruta correcta a tu acción
import Cards from "../../components/cards/cards";
import Navbar from "../../components/navBar/navBar"
import Paginated from "../../components/paginated/paginated"
import "./home.css";


function Home() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.food);

  const itemsPerPage = 9;
  const [currentRecipesPage, setCurrentRecipesPage] = useState(1);

  useEffect(() => {
    dispatch(getAllRecipes());
    setCurrentRecipesPage(1); // Reinicia la página a 1 cuando se obtienen todas las recetas
  }, [dispatch]);

  useEffect(() => {
    setCurrentRecipesPage(1); // Reinicia la página a 1 cuando cambian las recetas
  }, [recipes]);

  const totalPages = Math.ceil(recipes.length / itemsPerPage);//Redondea hacia arriba dividiendo la cantidad de recetas por la cantidad de items

  const handlePageChange = (pageNumber) => {
    setCurrentRecipesPage(pageNumber);
  };

  return (
    <div className="home-container">
      <Navbar />
      <br />
      <Paginated
        currentPage={currentRecipesPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <Cards
        receta={recipes.slice(
          (currentRecipesPage - 1) * itemsPerPage,
          currentRecipesPage * itemsPerPage
        )}
      />
    </div>
  );
}

export default Home;

