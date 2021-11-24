import React from 'react'

export default function Header() {
    return (

        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/" className="navbar-brand">
                Consulta Fácil
            </a>
            <div className="navbar-nav mr-auto">
                <li className="nav-link">
                    <a href={"/medicos"} className="nav-link">
                        Médicos
                    </a>
                </li>
                <li className="nav-link">
                    <a href={"/agendamentos"} className="nav-link">
                        Agendamentos
                    </a>
                </li>
                <li className="nav-link">
                    <a href={"/exames"} className="nav-link">
                        Exames
                    </a>
                </li>
            </div>
        </nav>

    )


}