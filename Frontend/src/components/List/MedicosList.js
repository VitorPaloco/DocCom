import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './List.css';

const API_URL = 'http://localhost:8080'; // URL do seu backend Spring Boot

const MedicosList = ({ limit }) => {
    const [medicos, setMedicos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedMedico, setSelectedMedico] = useState(null);
    const [searchText, setSearchText] = useState('');

    const fetchMedicos = async () => {
        try {
            const response = await axios.get(`${API_URL}/medico/listarMedicos`);
            setMedicos(response.data);
        } catch (error) {
            console.error('Erro ao obter médicos:', error);
        }
    };

    useEffect(() => {
        fetchMedicos();
    }, []);

    const limitedMedicos = limit ? medicos.slice(0, limit) : medicos;

    const handleAddMedico = async () => {
        try {
            await axios.post(`${API_URL}/medico/cadastrarMedico`, selectedMedico);
            fetchMedicos(); // Atualiza a lista após adicionar médico
            setShowAddModal(false);
            setSelectedMedico(null);
        } catch (error) {
            console.error('Erro ao adicionar médico:', error);
        }
    };

    const handleEditMedico = (medico) => {
        setSelectedMedico(medico);
        setShowEditModal(true);
    };

    const handleUpdateMedico = async () => {
        try {
            await axios.put(`${API_URL}/medico/alterarMedico`, selectedMedico);
            fetchMedicos(); // Atualiza a lista após editar médico
            setShowEditModal(false);
        } catch (error) {
            console.error('Erro ao atualizar médico:', error);
        }
    };

    const filteredMedicos = medicos.filter(medico =>
        medico.nomeMedico.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="container">
            <h1>Lista de Médicos</h1>
            <ul className="list">
                {limitedMedicos.map(medico => (
                    <li key={medico.IDMedico} className="item">
                        <p><span className="titulo">Nome:</span> {medico.nomeMedico}</p>
                        <p><span className="titulo">CRM:</span> {medico.crmMedico}</p>
                        <button onClick={() => handleEditMedico(medico)}>Editar</button>
                    </li>
                ))}
            </ul>
            <div className="button-container">
                {limit && <button onClick={() => setShowModal(true)}>Listar todos</button>}
                <button onClick={() => setShowAddModal(true)}>Adicionar Médico</button>
            </div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                        <input
                            type="text"
                            placeholder="Buscar médico"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="search-bar"
                        />
                        <ul className="list">
                            {filteredMedicos.map(medico => (
                                <li key={medico.IDMedico} className="item">
                                    <p><span className="titulo">Nome:</span> {medico.nomeMedico}</p>
                                    <p><span className="titulo">CRM:</span> {medico.crmMedico}</p>
                                    <p><span className="titulo">Senha:</span> {medico.senhaMedico}</p>
                                    <button onClick={() => handleEditMedico(medico)}>Editar</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            {showAddModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowAddModal(false)}>&times;</span>
                        <h2>Adicionar novo médico</h2>
                        <form className="add-form">
                            <label>
                                <input
                                    type="text"
                                    placeholder="Nome"
                                    value={selectedMedico?.nomeMedico || ''}
                                    onChange={(e) => setSelectedMedico({ ...selectedMedico, nomeMedico: e.target.value })}
                                />
                            </label>
                            <label>
                                <input
                                    type="text"
                                    placeholder="CRM"
                                    value={selectedMedico?.crmMedico || ''}
                                    onChange={(e) => setSelectedMedico({ ...selectedMedico, crmMedico: e.target.value })}
                                />
                            </label>
                            <label>
                                <input
                                    type="password"
                                    placeholder="Senha"
                                    value={selectedMedico?.senhaMedico || ''}
                                    onChange={(e) => setSelectedMedico({ ...selectedMedico, senhaMedico: e.target.value })}
                                />
                            </label>
                            <div className="button-container">
                                <button type="button" onClick={handleAddMedico}>Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showEditModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowEditModal(false)}>&times;</span>
                        <h2>Editar Médico</h2>
                        <form className="edit-form">
                            <label>
                                <input
                                    type="text"
                                    placeholder="Nome"
                                    value={selectedMedico?.nomeMedico || ''}
                                    onChange={(e) => setSelectedMedico({ ...selectedMedico, nomeMedico: e.target.value })}
                                />
                            </label>
                            <label>
                                <input
                                    type="text"
                                    placeholder="CRM"
                                    value={selectedMedico?.crmMedico || ''}
                                    onChange={(e) => setSelectedMedico({ ...selectedMedico, crmMedico: e.target.value })}
                                />
                            </label>
                            <label>
                                <input
                                    type="password"
                                    placeholder="Senha"
                                    value={selectedMedico?.senhaMedico || ''}
                                    onChange={(e) => setSelectedMedico({ ...selectedMedico, senhaMedico: e.target.value })}
                                />
                            </label>
                            <div className="button-container">
                                <button type="button" onClick={handleUpdateMedico}>Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MedicosList;
