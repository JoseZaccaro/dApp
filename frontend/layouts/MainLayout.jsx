import React from 'react';
import { Link } from 'react-router-dom';


const Layout = ({ children }) => {
    return (<>
        <nav>
            <ul>
                <li>
                    <Link to="/calculadora">Calculadora</Link>
                </li>
                <li>
                    <Link to="/todo-list">To Do List</Link>
                </li>
                <li>
                    <Link to="/foro">Foro/Muro de Estudiantes</Link>
                </li>
                <li>
                    <Link to="/consulta-crypto">Consulta de Cryptomoneda</Link>
                </li>
                <li>
                    <Link to="/verificador-tareas">Verificador de Tareas para Profesores</Link>
                </li>
            </ul>
        </nav>
        {children}

    </>
    );
};

export default Layout;
