import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home/home';
import Landing from './pages/Landing/landing';
import Form from './pages/form/form';
import Detail from "./pages/detail/detail"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/form" element={<Form />} />
    </Routes>
  );
}

export default App;
