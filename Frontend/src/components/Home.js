import React from 'react';
import MedicosList from './List/MedicosList';
import PacientesList from './List/PacientesList';
import FarmaciasList from './List/FarmaciasList';
import MedicamentosList from './List/MedicamentosList';
import ReceitasList from './List/ReceitasList';
import './Home.css';

const Home = () => {
    return (
        <div>
            <header className="header">
                <a href="#" className="logo">DocCom.</a>
                <nav className="navbar">
                    <a href="#home" className="active">Home</a>
                    <a href="/">Sair</a>
                </nav>
            </header>

            <div className="home-container">
                <div className="sections-grid">
                    <div className="section">
                        <MedicosList limit={2} />
                    </div>
                    <div className="section">
                        <PacientesList limit={2} />
                    </div>
                    <div className="section">
                        <FarmaciasList limit={2} />
                    </div>
                    <div className="section">
                        <MedicamentosList limit={2} />
                    </div>
                    <div className="section">
                        <ReceitasList limit={2} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
