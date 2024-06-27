import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './List.css';

const API_URL = 'http://localhost:8080'; // URL do seu backend Spring Boot

const PacientesList = ({ limit }) => {
    const [pacientes, setPacientes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedPaciente, setSelectedPaciente] = useState(null);
    const [newPaciente, setNewPaciente] = useState({
        nomePaciente: '',
        cpfPaciente: '',
        nascimentoPaciente: ''
    });
    const [searchText, setSearchText] = useState(''); // Estado para o texto de pesquisa

    const fetchPacientes = async () => {
        try {
            const response = await axios.get(`${API_URL}/paciente/listarPacientes`);
            setPacientes(response.data);
        } catch (error) {
            console.error('Erro ao obter pacientes:', error);
        }
    };

    useEffect(() => {
        fetchPacientes();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    const limitedPacientes = limit ? pacientes.slice(0, limit) : pacientes;

    const handleAddPaciente = async () => {
        try {
            await axios.post(`${API_URL}/paciente/cadastrarPaciente`, newPaciente);
            fetchPacientes(); // Atualiza a lista após adicionar paciente
            setShowAddModal(false);
            setNewPaciente({ nomePaciente: '', cpfPaciente: '', nascimentoPaciente: '' });
        } catch (error) {
            console.error('Erro ao adicionar paciente:', error);
        }
    };

    const handleEditPaciente = (paciente) => {
        setSelectedPaciente(paciente);
        setShowEditModal(true);
    };

    const handleUpdatePaciente = async () => {
        try {
            await axios.put(`${API_URL}/paciente/alterarPaciente`, selectedPaciente);
            fetchPacientes(); // Atualiza a lista após editar paciente
            setShowEditModal(false);
        } catch (error) {
            console.error('Erro ao atualizar paciente:', error);
        }
    };

    const filteredPacientes = pacientes.filter(paciente =>
        paciente.nomePaciente.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="container">
            <h1>Lista de Pacientes</h1>
            <ul className="list">
                {limitedPacientes.map(paciente => (
                    <li key={paciente.id} className="item">
                        <p><span className="titulo">Nome:</span> {paciente.nomePaciente}</p>
                        <p><span className="titulo">CPF:</span> {paciente.cpfPaciente}</p>
                        <button onClick={() => handleEditPaciente(paciente)}>Editar</button>
                    </li>
                ))}
            </ul>
            <div className="button-container">
                {limit && <button onClick={() => setShowModal(true)}>Listar todos</button>}
                <button onClick={() => setShowAddModal(true)}>Adicionar Paciente</button>
            </div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                        <input
                            type="text"
                            placeholder="Buscar paciente"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="search-bar"
                        />
                        <ul className="list">
                            {filteredPacientes.map(paciente => (
                                <li key={paciente.id} className="item">
                                    <p><span className="titulo">Nome:</span> {paciente.nomePaciente}</p>
                                    <p><span className="titulo">CPF:</span> {paciente.cpfPaciente}</p>
                                    <p><span className="titulo">Nascimento:</span> {formatDate(paciente.nascimentoPaciente)}</p>
                                    <button onClick={() => handleEditPaciente(paciente)}>Editar</button>
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
                        <h2>Adicionar novo paciente</h2>
                        <form className="add-form">
                            <label>
                                <input
                                    type="text"
                                    placeholder="Nome"
                                    value={newPaciente.nomePaciente}
                                    onChange={(e) => setNewPaciente({ ...newPaciente, nomePaciente: e.target.value })}
                                />
                            </label>
                            <label>
                                <input
                                    type="text"
                                    placeholder="CPF"
                                    value={newPaciente.cpfPaciente}
                                    onChange={(e) => setNewPaciente({ ...newPaciente, cpfPaciente: e.target.value })}
                                />
                            </label>
                            <label>
                                <input
                                    type="date"
                                    placeholder="Data de Nascimento"
                                    value={newPaciente.nascimentoPaciente}
                                    onChange={(e) => setNewPaciente({ ...newPaciente, nascimentoPaciente: e.target.value })}
                                />
                            </label>
                            <div className="button-container">
                                <button type="button" onClick={handleAddPaciente}>Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showEditModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowEditModal(false)}>&times;</span>
                        <h2>Editar Paciente</h2>
                        <form className="edit-form">
                            <label>
                                <input
                                    type="text"
                                    placeholder="Nome"
                                    value={selectedPaciente?.nomePaciente || ''}
                                    onChange={(e) => setSelectedPaciente({ ...selectedPaciente, nomePaciente: e.target.value })}
                                />
                            </label>
                            <label>
                                <input
                                    type="text"
                                    placeholder="CPF"
                                    value={selectedPaciente?.cpfPaciente || ''}
                                    onChange={(e) => setSelectedPaciente({ ...selectedPaciente, cpfPaciente: e.target.value })}
                                />
                            </label>
                            <label>
                                <input
                                    type="date"
                                    placeholder="Data de Nascimento"
                                    value={selectedPaciente?.nascimentoPaciente || ''}
                                    onChange={(e) => setSelectedPaciente({ ...selectedPaciente, nascimentoPaciente: e.target.value })}
                                />
                            </label>
                            <div className="button-container">
                                <button type="button" onClick={handleUpdatePaciente}>Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PacientesList;
