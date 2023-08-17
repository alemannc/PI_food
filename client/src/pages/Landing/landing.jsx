import { useNavigate } from 'react-router-dom';
import "./landing.css";



const Landing = () => {
  const navigate = useNavigate();

  const homeHandler = () => {
    navigate('/home');
  };

  return (
    <div className="landing-container">
      <button className="landingButton" onClick={homeHandler}>
        Ingresar
      </button>
    </div>
  );
};

export default Landing;