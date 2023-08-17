import './form.css';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiets, postRecipe } from '../../redux/actions';
import { Link } from 'react-router-dom';


function Form() {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets); //Array de dietas para el formulario

  //Estado del formulario
  const [form, setForm] = useState({
    name: "",
    summary: "",
    healthScore: "",
    steps: "",
    image: "",
    diets: [],
  });
//Estado de errores para el form
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    summary: "",
    healthScore: "",
    steps: "",
    image: ""
  });
//Estado para validaciones en tiempo real 
  const [formIsValid, setFormIsValid] = useState(true);

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);


  const handleChange = (e) => {
    const { name, value } = e.target;
   
//Esta funcion va actualizando el formulario con los valores que va ingresando el usurario
    setForm({
      ...form,
      [name]: value,
    });
//Inicializa la variable error para almacenar el valor del error y luego realiza las validaciones del campo actual "name"
    let error = "";
    if (name === "name" && value.trim() === "") {
      error = "El campo Nombre es requerido";
    } else if (name === "summary" && (value.length < 15 || value.length > 150)) {
      error = "El resumen del plato debe contener entre 15 y 150 caracteres";
    } else if (name === "healthScore" && (value < 0 || value > 100)) {
      error = "El nivel de comida saludable debe ser un número entre 0 y 100";
    } else if (name === "steps" && (value.length < 15 || value.length > 150)) {
      error = "El paso a paso del plato debe contener entre 15 y 150 caracteres";
    }

//Luego actualiza el estado de errores con el mensaje correspondiente  
    setFieldErrors({
      ...fieldErrors,
      [name]: error,
    });

    // Aqui guarda en un array todos los valores de los errores que tenga el formulario, con el metodo some se fija si alguno de los errores no es un string vacio. 
    //Si alguno no es un string vacio entonces devolverla false, para poner el estado del formulario como invalido pero si todos son string vacios devuelve true para poder enviarlo
    setFormIsValid(!Object.values(fieldErrors).some((error) => error !== ""));
  };

  const handleDietChange = (e) => {
    //En la constante selectedOptions creamos un array nuevo con los valores de las dietas 
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setForm({
      ...form,
      // Aqui utilizamos el new Set para que no se pueda seleccionar dos veces la misma dieta
      diets: [...new Set([...form.diets, ...selectedOptions])],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formIsValid) {
      dispatch(postRecipe(form));
      setForm({
        name: "",
        summary: "",
        healthScore: "",
        steps: "",
        image: "",
        diets: [],
      });
      setFieldErrors({
        name: "",
        summary: "",
        healthScore: "",
        steps: "",
        image: ""
      });
      alert("¡La receta se ha creado correctamente!");
    }
  };

  const deleteDiet = (diet) => {
    setForm((prevForm) => ({
      ...prevForm,
      //Creamos un nuevo array de dietas con todas als dietas que no sean igual a la que queremos eliminar
      diets: prevForm.diets.filter((d) => d !== diet),
    }));
  };

  return (
    <div className="form-container">
      <div className='formColor'>

        <div>
          <h1 className='h1-form'>Crear Receta</h1>
        </div>
        <div>
          <form id="myForm" onSubmit={handleSubmit}>
            <div>
              <label>Nombre:</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </div>
              {fieldErrors.name && <span className="error">{fieldErrors.name}</span>}
            <div>
              <label>Resumen del plato:</label>
              <input
                type="text"
                name="summary"
                value={form.summary}
                onChange={handleChange}
              />
            </div>
              {fieldErrors.summary && <span className="error">{fieldErrors.summary}</span>}
            <div>
              <label>Nivel de comida saludable:</label>
              <input
                type="number"
                name="healthScore"
                value={form.healthScore}
                onChange={handleChange}
              />
            </div>
              {fieldErrors.healthScore && <span className="error">{fieldErrors.healthScore}</span>}
            <div>
              <label>Paso a paso:</label>
              <input
                type="text"
                name="steps"
                value={form.steps}
                onChange={handleChange}
              />
            </div>
              {fieldErrors.steps && <span className="error">{fieldErrors.steps}</span>}
            <div>
              <label>Imagen:</label>
              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
              />
            </div>
              {fieldErrors.image && <span className="error">{fieldErrors.image}</span>}
            <div>
              <label>Seleccionar Dietas:</label>
              <select
                multiple
                name="diets"
                value={form.diets}
                onChange={handleDietChange}
              >
                {diets.map((diet) => (
                  <option key={diet.name} value={diet.name}>
                    {diet.name}
                  </option>
                ))}
              </select>
            </div>
            <div className='button_container'>
              <button type="submit">Crear Receta</button>
              <Link to="/home"><button type='submit'> Home</button></Link>
            </div>
          </form>
          <div className='diets-container'>
            {form.diets.map((diet) => (
              <div key={diet}>
                <p className='p-form'>{diet}</p>
                <button onClick={() => deleteDiet(diet)}> X </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;