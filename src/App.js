import './App.css';
import Phone from './Imagen/Phone.png';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

function App() {
  const [conteo, setConteo] = useState(15);
  const [tabla, setTabla] = useState([]);
  const [pasos, setPasos] = useState(0);

  async function btnStop() {
    if (conteo === 15 || conteo === 0) {
      const verde = document.getElementById('green');
      const amarillo = document.getElementById('yellow');
      const rojo = document.getElementById('red');


      setTimeout(() => {
        verde.style.opacity = '10%';
        amarillo.style.opacity = '100%';
      }, 1000);
      setTimeout(() => {
        amarillo.style.opacity = '10%';
        rojo.style.opacity = '100%';

      }, 2000);

      const lat = (Math.random() * (999.999 - (-999.999)) + -999.999).toFixed(5);
      const long = (Math.random() * (999.999 - (-999.999)) + -999.999).toFixed(5);

      setConteo(15);
      setTimeout(function () { setConteo(14) }, 3000);
      setTimeout(function () { setConteo(13) }, 4000);
      setTimeout(function () { setConteo(12) }, 5000);
      setTimeout(function () { setConteo(11) }, 6000);
      setTimeout(function () { setConteo(10) }, 7000);
      setTimeout(function () { setConteo(9) }, 8000);
      setTimeout(function () { setConteo(8) }, 9000);
      setTimeout(function () { setConteo(7) }, 10000);
      setTimeout(function () { setConteo(6) }, 11000);
      setTimeout(function () { setConteo(5) }, 12000);
      setTimeout(function () { setConteo(4) }, 13000);
      setTimeout(function () { setConteo(3) }, 14000);
      setTimeout(function () { setConteo(2) }, 15000);
      setTimeout(function () { setConteo(1) }, 16000);
      setTimeout(function () { setConteo(0) }, 17000);



      setTimeout(async function () {
        rojo.style.opacity = '10%';
        verde.style.opacity = '100%';
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
            var cont = 0;
            respuesta.map((registro) => (
              cont += registro.pasos
            ));
            setPasos(cont)
            setTabla(respuesta);
          }
        }
      }, 17000);
    }
  }



  useEffect(() => {
    // Color verde al iniciar pagina
    const verde = document.getElementById('green');
    verde.style.opacity = '100%';

    const fetchTabla = async () => {
      const response = await fetch('http://localhost:9000/api/leer');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const respuesta = await response.json();
      if (respuesta) {
        console.log(respuesta);
        var cont = 0;
        respuesta.map((registro) => (
          cont += registro.pasos
          
        ))
        setPasos(cont);
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
        <table className='table table-dark'>
          <thead>
            <tr>
              <th>Total Pasos</th>
              <th>Total Metros</th>
            </tr>
          </thead>
          <tbody>
            <tr >
              <td>{pasos} ft</td>
              <td>{pasos * 3.048} m.</td>
            </tr>


          </tbody>
        </table>
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
