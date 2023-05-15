import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/dashboard.css'; // Importa los estilos CSS

const Dashboard = () => {
  return (
    <div className="container">
      <h1>Bienvenido al Dashboard</h1>

      <p>Este es tu panel de control donde puedes acceder a diferentes funcionalidades:</p>

      <ul>
        <li>
          <Link to="/calculadora">Calculadora</Link> - Una calculadora para realizar operaciones matemáticas.
        </li>
        <li>
          <Link to="/todo-list">To Do List</Link> - Una lista de tareas para gestionar tus pendientes.
        </li>
        <li>
          <Link to="/foro">Foro/Muro de Estudiantes</Link> - Un espacio para interactuar con otros estudiantes.
        </li>
        <li>
          <Link to="/consulta-crypto">Consulta de Cryptomoneda</Link> - Obtén información sobre diferentes criptomonedas.
        </li>
        <li>
          <Link to="/verificador-tareas">Verificador de Tareas para Profesores</Link> - Verifica y califica las tareas de tus alumnos.
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;
