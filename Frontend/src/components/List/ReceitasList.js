import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './List.css';

const API_URL = 'http://localhost:8080'; // URL do seu backend Spring Boot

const ReceitasList = ({ limit }) => {
    const [receitas, setReceitas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newReceita, setNewReceita] = useState({
        pacienteId: '',
        medicoId: '',
        farmaciaId: '',
        medicamentos: []
    });

    const [pacientes, setPacientes] = useState([]);
    const [medicos, setMedicos] = useState([]);
    const [farmacias, setFarmacias] = useState([]);
    const [todosMedicamentos, setTodosMedicamentos] = useState([]);
    const [medicamentosSelecionados, setMedicamentosSelecionados] = useState([]);

    const [searchText, setSearchText] = useState(''); // Estado para o texto de pesquisa

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pacientesResponse = await axios.get(`${API_URL}/paciente/listarPacientes`);
                setPacientes(pacientesResponse.data);

                const medicosResponse = await axios.get(`${API_URL}/medico/listarMedicos`);
                setMedicos(medicosResponse.data);

                const farmaciasResponse = await axios.get(`${API_URL}/farmacia/listarFarmacias`);
                setFarmacias(farmaciasResponse.data);

                const medicamentosResponse = await axios.get(`${API_URL}/medicamento/listarMedicamentos`);
                setTodosMedicamentos(medicamentosResponse.data);

                const receitasResponse = await axios.get(`${API_URL}/receita/listarReceitas`);
                setReceitas(receitasResponse.data); // Ajustar aqui se o backend retornar dados diferentes
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
    }, []);

    const limitedReceitas = limit ? receitas.slice(0, limit) : receitas;

    const handleAddReceita = async () => {
        try {
            const receitaParaSalvar = {
                pacienteId: newReceita.pacienteId,
                medicoId: newReceita.medicoId,
                farmaciaId: newReceita.farmaciaId,
                medicamentos: medicamentosSelecionados.map(med => ({ id: med.id }))
            };

            await axios.post(`${API_URL}/receita/adicionarReceita`, receitaParaSalvar);
            setReceitas([...receitas, receitaParaSalvar]);
            setShowAddModal(false);
            setNewReceita({ pacienteId: '', medicoId: '', farmaciaId: '', medicamentos: [] });
            setMedicamentosSelecionados([]);
        } catch (error) {
            console.error('Erro ao adicionar receita:', error);
        }
    };

    const handleAddMedicamento = (medicamentoId) => {
        const medicamento = todosMedicamentos.find(med => med.id === parseInt(medicamentoId));
        if (medicamento && !medicamentosSelecionados.some(med => med.id === medicamento.id)) {
            setMedicamentosSelecionados([...medicamentosSelecionados, medicamento]);
        }
    };

    const handleRemoveMedicamento = (medicamentoId) => {
        const updatedMedicamentos = medicamentosSelecionados.filter(med => med.id !== medicamentoId);
        setMedicamentosSelecionados(updatedMedicamentos);
    };

    const handleShowAll = () => {
        setShowModal(true);
    };

    const filteredReceitas = receitas.filter(receita =>
        receita.paciente && receita.paciente.nomePaciente.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="container">
            <h1>Lista de Receitas</h1>
            <ul className="list">
                {limitedReceitas.map(receita => (
                    <li key={receita.IDReceita} className="item">
                        <p><span className="titulo">Paciente:</span> {receita.paciente ? receita.paciente.nomePaciente : 'Nome do Paciente não disponível'}</p>
                        <p><span className="titulo">Médico:</span> {receita.medico.nomeMedico}</p>
                    </li>
                ))}
            </ul>
            <div className="button-container">
                {limit && <button onClick={handleShowAll}>Listar todas</button>}
                <button onClick={() => setShowAddModal(true)}>Adicionar Receita</button>
            </div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                        <input
                            type="text"
                            placeholder="Buscar receitas"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="search-bar"
                        />
                        <ul className="list">
                            {filteredReceitas.map(receita => (
                                <li key={receita.IDReceita} className="item">
                                    <p><span className="titulo">Paciente:</span> {receita.paciente ? receita.paciente.nomePaciente : 'Nome do Paciente não disponível'}</p>
                                    <p><span className="titulo">Médico:</span> {receita.medico.nomeMedico}</p>
                                    <p><span className="titulo">Farmácia:</span> {receita.farmacia.nomeFarmacia}</p>
                                    <p><span className="titulo">Medicamentos:</span> {receita.medicamentos.map(medicamento => medicamento.nomeMedicamento).join(', ')}</p>
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
                        <h2>Adicionar Nova Receita</h2>
                        <form className="add-form">
                            <label>
                                <select
                                    value={newReceita.pacienteId}
                                    onChange={(e) => setNewReceita({ ...newReceita, pacienteId: e.target.value })}
                                >
                                    <option value="">Selecione um paciente</option>
                                    {pacientes.map(paciente => (
                                        <option key={paciente.id} value={paciente.id}>{paciente.nomePaciente}</option>
                                    ))}
                                </select>
                            </label>
                            <label>
                                <select
                                    value={newReceita.medicoId}
                                    onChange={(e) => setNewReceita({ ...newReceita, medicoId: e.target.value })}
                                >
                                    <option value="">Selecione um médico</option>
                                    {medicos.map(medico => (
                                        <option key={medico.id} value={medico.id}>{medico.nomeMedico}</option>
                                    ))}
                                </select>
                            </label>
                            <label>
                                <select
                                    value={newReceita.farmaciaId}
                                    onChange={(e) => setNewReceita({ ...newReceita, farmaciaId: e.target.value })}
                                >
                                    <option value="">Selecione uma farmácia</option>
                                    {farmacias.map(farmacia => (
                                        <option key={farmacia.id} value={farmacia.id}>{farmacia.nomeFarmacia}</option>
                                    ))}
                                </select>
                            </label>
                            <div className="medicamentos-container">
                                <label>Medicamentos Selecionados:</label>
                                <ul className="medicamentos-list">
                                    {medicamentosSelecionados.map(medicamento => (
                                        <li key={medicamento.id} className="medicamento-item">
                                            {medicamento.nomeMedicamento}
                                            <button type="button" onClick={() => handleRemoveMedicamento(medicamento.id)}>Remover</button>
                                        </li>
                                    ))}
                                </ul>
                                <label>
                                    <select
                                        value={''}
                                        onChange={(e) => handleAddMedicamento(e.target.value)}
                                    >
                                        <option value="">Selecione um medicamento</option>
                                        {todosMedicamentos.map(medicamento => (
                                            <option key={medicamento.id} value={medicamento.id}>{medicamento.nomeMedicamento}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                            <div className="button-container">
                                <button type="button" onClick={handleAddReceita}>Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReceitasList;
