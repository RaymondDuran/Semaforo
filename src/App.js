import './App.css';
import Phone from './Imagen/Phone.png';
import { useState, useEffect } from 'react';

function App() {
  const [conteo, setConteo] = useState(15);
  const [tabla, setTabla] = useState([]);

  

  useEffect(() => {

    const fetchTabla = async () => {
      const response = await fetch('http://localhost:9000/api/leer');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const respuesta = await response.json();
      if (respuesta) {
        setTabla(respuesta);
      }
    };
    fetchTabla();
  }, []);

  return (
    <div className="row cuerpa">
      <div className='col'>
        <table className='table table-dark'>
          <thead>
            <tr>
              <th>Pasos</th>
              <th>Ubicacion</th>
            </tr>
          </thead>
          <tbody>
            {tabla.map((fila, i) => (
              <tr>
                <td>{fila.pasos}</td>
                <td>{fila.ubicacion}</td>
              </tr>
            ))}

          </tbody>
        </table>

      </div>
      <div className='col'>
        <div class="trafficlight">
          <div class="protector"></div>
          <div class="protector"></div>
          <div class="protector"></div>
          <div class="red" id="red"></div>
          <div class="yellow" id="yellow"></div>
          <div class="green" id="green"></div>
        </div>

      </div>
      <div className='col'>
        <img src={Phone} alt="Bue" className='phone ' />
        <button className='Button '>STOP</button>
        <div className='contador'>

          <h6>Contador</h6>
          <p className='cont'>{conteo}</p>

        </div>
      </div>

    </div>
  );
}

export default App;
