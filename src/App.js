import './App.css';
import Phone from './Imagen/Phone.png';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

function App() {
  const [conteo, setConteo] = useState(15);
  const [tabla, setTabla] = useState([]);

  async function btnStop() {
    const lat = (Math.random() * (999.999 - (-999.999)) + -999.999).toFixed(5);
    const long = (Math.random() * (999.999 - (-999.999)) + -999.999).toFixed(5);

    const response = await fetch('http://localhost:9000/api/add',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pasos: 10,
          ubicacion: lat + ", " + long
        })
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    if (response.ok) {
      const response = await fetch('http://localhost:9000/api/leer');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const respuesta = await response.json();
      if (respuesta) {
        setTabla(respuesta);
      }
    }
  }



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
              <tr key={i}>
                <td>{fila.pasos}</td>
                <td>{fila.ubicacion}</td>
              </tr>
            ))}

          </tbody>
        </table>

      </div>
      <div className='col'>
        <div className="trafficlight">
          <div className="protector"></div>
          <div className="protector"></div>
          <div className="protector"></div>
          <div className="red" id="red"></div>
          <div className="yellow" id="yellow"></div>
          <div className="green" id="green"></div>
        </div>

      </div>
      <div className='col'>
        <img src={Phone} alt="Bue" className='phone ' />
        <button onClick={btnStop} className='Button '>STOP</button>
        <div className='contador'>

          <h6>Contador</h6>
          <p className='cont'>{conteo}</p>

        </div>
      </div>

    </div>
  );
}

export default App;
