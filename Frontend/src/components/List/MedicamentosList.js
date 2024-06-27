import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './List.css';

const API_URL = 'http://localhost:8080'; // URL do seu backend Spring Boot

const MedicamentosList = ({ limit }) => {
    const [medicamentos, setMedicamentos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedMedicamento, setSelectedMedicamento] = useState(null);
    const [newMedicamento, setNewMedicamento] = useState({
        nomeMedicamento: '',
        dosagem: '',
        quantidade: '',
        observacao: ''
    });
    const [searchText, setSearchText] = useState(''); // Estado para o texto de pesquisa

    const fetchMedicamentos = async () => {
        try {
            const response = await axios.get(`${API_URL}/medicamento/listarMedicamentos`);
            setMedicamentos(response.data);
        } catch (error) {
            console.error('Erro ao obter medicamentos:', error);
        }
    };

    useEffect(() => {
        fetchMedicamentos();
    }, []);

    const limitedMedicamentos = limit ? medicamentos.slice(0, limit) : medicamentos;

    const handleAddMedicamento = async () => {
        try {
            const response = await axios.post(`${API_URL}/medicamento/cadastrarMedicamento`, newMedicamento);
            setMedicamentos([...medicamentos, response.data]);
            setShowAddModal(false);
            setNewMedicamento({ nomeMedicamento: '', dosagem: '', quantidade: '', observacao: '' });
        } catch (error) {
            console.error('Erro ao adicionar medicamento:', error);
        }
    };

    const handleShowAll = () => {
        setShowModal(true);
    };

    const handleEditMedicamento = (medicamento) => {
        setSelectedMedicamento(medicamento);
        setShowEditModal(true);
    };

    const handleUpdateMedicamento = async () => {
        try {
            await axios.put(`${API_URL}/medicamento/alterarMedicamento`, selectedMedicamento);
            fetchMedicamentos(); // Atualiza a lista após editar medicamento
            setShowEditModal(false);
        } catch (error) {
            console.error('Erro ao atualizar medicamento:', error);
        }
    };

    const filteredMedicamentos = medicamentos.filter(medicamento =>
        medicamento.nomeMedicamento.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="container">
            <h1>Lista de Medicamentos</h1>
            <ul className="list">
                {limitedMedicamentos.map(medicamento => (
                    <li key={medicamento.id} className="item">
                        <p><span className="titulo">Nome:</span> {medicamento.nomeMedicamento}</p>
                        <p><span className="titulo">Obs:</span> {medicamento.observacao}</p>
                        <button onClick={() => handleEditMedicamento(medicamento)}>Editar</button>
                    </li>
                ))}
            </ul>
            <div className="button-container">
                {limit && <button onClick={handleShowAll}>Listar todos</button>}
                <button onClick={() => setShowAddModal(true)}>Adicionar Medicamento</button>
            </div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                        <input
                            type="text"
                            placeholder="Buscar medicamento"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="search-bar"
                        />
                        <ul className="list">
                            {filteredMedicamentos.map(medicamento => (
                                <li key={medicamento.id} className="item">
                                    <p><span className="titulo">Nome:</span> {medicamento.nomeMedicamento}</p>
                                    <p><span className="titulo">Dosagem:</span> {medicamento.dosagem}</p>
                                    <p><span className="titulo">Quantidade:</span> {medicamento.quantidade}</p>
                                    <p><span className="titulo">Obs:</span> {medicamento.observacao}</p>
                                    <button onClick={() => handleEditMedicamento(medicamento)}>Editar</button>
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
                        <h2>Adicionar Novo Medicamento</h2>
                        <form className="add-form">
                            <label>
                                <input
                                    type="text"
                                    placeholder="Nome"
                                    value={newMedicamento.nomeMedicamento}
                                    onChange={(e) => setNewMedicamento({ ...newMedicamento, nomeMedicamento: e.target.value })}
                                />
                            </label>
                            <label>
                                <input
                                    type="text"
                                    placeholder="Dosagem"
                                    value={newMedicamento.dosagem}
                                    onChange={(e) => setNewMedicamento({ ...newMedicamento, dosagem: e.target.value })}
                                />
                            </label>
                            <label>
                                <input
                                    type="text"
                                    placeholder="Quantidade"
                                    value={newMedicamento.quantidade}
                                    onChange={(e) => setNewMedicamento({ ...newMedicamento, quantidade: e.target.value })}
                                />
                            </label>
                            <label>
                                <input
                                    type="text"
                                    placeholder="Obs"
                                    value={newMedicamento.observacao}
                                    onChange={(e) => setNewMedicamento({ ...newMedicamento, observacao: e.target.value })}
                                />
                            </label>
                            <div className="button-container">
                                <button type="button" onClick={handleAddMedicamento}>Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showEditModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowEditModal(false)}>&times;</span>
                        <h2>Editar Medicamento</h2>
                        <form className="edit-form">
                            <label>
                                <input
                                    type="text"
                                    placeholder="Nome"
                                    value={selectedMedicamento?.nomeMedicamento || ''}
                                    onChange={(e) => setSelectedMedicamento({ ...selectedMedicamento, nomeMedicamento: e.target.value })}
                                />
                            </label>
                            <label>
                                <input
                                    type="text"
                                    placeholder="Dosagem"
                                    value={selectedMedicamento?.dosagem || ''}
                                    onChange={(e) => setSelectedMedicamento({ ...selectedMedicamento, dosagem: e.target.value })}
                                />
                            </label>
                            <label>
                                <input
                                    type="text"
                                    placeholder="Quantidade"
                                    value={selectedMedicamento?.quantidade || ''}
                                    onChange={(e) => setSelectedMedicamento({ ...selectedMedicamento, quantidade: e.target.value })}
                                />
                            </label>
                            <label>
                                <input
                                    type="text"
                                    placeholder="Obs"
                                    value={selectedMedicamento?.observacao || ''}
                                    onChange={(e) => setSelectedMedicamento({ ...selectedMedicamento, observacao: e.target.value })}
                                />
                            </label>
                            <div className="button-container">
                                <button type="button" onClick={handleUpdateMedicamento}>Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MedicamentosList;
