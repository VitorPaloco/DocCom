import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './List.css';

const API_URL = 'http://localhost:8080'; // URL do seu backend Spring Boot

const FarmaciasList = ({ limit }) => {
    const [farmacias, setFarmacias] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedFarmacia, setSelectedFarmacia] = useState(null);
    const [newFarmacia, setNewFarmacia] = useState({
        nomeFarmacia: '',
        cnpjFarmacia: '',
        senhaFarmacia: '',
        localFarmacia: ''
    });
    const [searchText, setSearchText] = useState('');

    // eslint-disable-next-line no-unused-vars
    const fetchFarmacias = async () => {
        try {
            const response = await axios.get(`${API_URL}/farmacia/listarFarmacias`);
            setFarmacias(response.data);
        } catch (error) {
            console.error('Erro ao obter farmácias:', error);
        }
    };

    useEffect(() => {
        fetchFarmacias(); // Chamada inicial para buscar farmácias ao carregar o componente
    }, []);

    const limitedFarmacias = limit ? farmacias.slice(0, limit) : farmacias;

    const handleAddFarmacia = async () => {
        try {
            await axios.post(`${API_URL}/farmacia/cadastrarFarmacia`, newFarmacia);
            fetchFarmacias(); // Atualiza a lista após adicionar farmácia
            setShowAddModal(false);
            setNewFarmacia({ nomeFarmacia: '', cnpjFarmacia: '', senhaFarmacia: '', localFarmacia: '' });
        } catch (error) {
            console.error('Erro ao adicionar farmácia:', error);
        }
    };

    const handleEditFarmacia = (farmacia) => {
        setSelectedFarmacia(farmacia);
        setShowEditModal(true);
    };

    const handleUpdateFarmacia = async () => {
        try {
            await axios.put(`${API_URL}/farmacia/alterarFarmacia`, selectedFarmacia);
            fetchFarmacias(); // Atualiza a lista após editar farmácia
            setShowEditModal(false);
        } catch (error) {
            console.error('Erro ao atualizar farmácia:', error);
        }
    };

    const filteredFarmacias = farmacias.filter(farmacia =>
        farmacia.nomeFarmacia.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="container">
            <h1>Lista de Farmácias</h1>
            <ul className="list">
                {limitedFarmacias.map(farmacia => (
                    <li key={farmacia.id} className="item">
                        <p><span className="titulo">Nome:</span> {farmacia.nomeFarmacia}</p>
                        <p><span className="titulo">CNPJ:</span> {farmacia.cnpjFarmacia}</p>
                        <button onClick={() => handleEditFarmacia(farmacia)}>Editar</button>
                    </li>
                ))}
            </ul>
            <div className="button-container">
                {limit && <button onClick={() => setShowModal(true)}>Listar todas</button>}
                <button onClick={() => setShowAddModal(true)}>Adicionar Farmácia</button>
            </div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                        <input
                            type="text"
                            placeholder="Buscar farmácia"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="search-bar"
                        />
                        <ul className="list">
                            {filteredFarmacias.map(farmacia => (
                                <li key={farmacia.id} className="item">
                                    <p><span className="titulo">Nome:</span> {farmacia.nomeFarmacia}</p>
                                    <p><span className="titulo">CNPJ:</span> {farmacia.cnpjFarmacia}</p>
                                    <p><span className="titulo">Local:</span> {farmacia.localFarmacia}</p>
                                    <p><span className="titulo">Senha:</span> {farmacia.senhaFarmacia}</p>
                                    <button onClick={() => handleEditFarmacia(farmacia)}>Editar</button>
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
                        <h2>Adicionar Nova Farmácia</h2>
                        <form className="add-form">
                            <label>
                                <input
                                    type="text"
                                    placeholder="Nome"
                                    value={newFarmacia.nomeFarmacia}
                                    onChange={(e) => setNewFarmacia({ ...newFarmacia, nomeFarmacia: e.target.value })}
                                />
                            </label>
                            <label>
                                <input
                                    type="text"
                                    placeholder="CNPJ"
                                    value={newFarmacia.cnpjFarmacia}
                                    onChange={(e) => setNewFarmacia({ ...newFarmacia, cnpjFarmacia: e.target.value })}
                                />
                            </label>
                            <label>
                                <input
                                    type="text"
                                    placeholder="Local"
                                    value={newFarmacia.localFarmacia}
                                    onChange={(e) => setNewFarmacia({ ...newFarmacia, localFarmacia: e.target.value })}
                                />
                            </label>
                            <label>
                                <input
                                    type="password"
                                    placeholder="Senha"
                                    value={newFarmacia.senhaFarmacia}
                                    onChange={(e) => setNewFarmacia({ ...newFarmacia, senhaFarmacia: e.target.value })}
                                />
                            </label>
                            <div className="button-container">
                                <button type="button" onClick={handleAddFarmacia}>Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showEditModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowEditModal(false)}>&times;</span>
                        <h2>Editar Farmácia</h2>
                        <form className="edit-form">
                            <label>
                                <input
                                    type="text"
                                    placeholder="Nome"
                                    value={selectedFarmacia?.nomeFarmacia || ''}
                                    onChange={(e) => setSelectedFarmacia({ ...selectedFarmacia, nomeFarmacia: e.target.value })}
                                />
                            </label>
                            <label>
                                <input
                                    type="text"
                                    placeholder="CNPJ"
                                    value={selectedFarmacia?.cnpjFarmacia || ''}
                                    onChange={(e) => setSelectedFarmacia({ ...selectedFarmacia, cnpjFarmacia: e.target.value })}
                                />
                            </label>
                            <label>
                                <input
                                    type="text"
                                    placeholder="Local"
                                    value={selectedFarmacia?.localFarmacia || ''}
                                    onChange={(e) => setSelectedFarmacia({ ...selectedFarmacia, localFarmacia: e.target.value })}
                                />
                            </label>
                            <label>
                                <input
                                    type="password"
                                    placeholder="Senha"
                                    value={selectedFarmacia?.senhaFarmacia || ''}
                                    onChange={(e) => setSelectedFarmacia({ ...selectedFarmacia, senhaFarmacia: e.target.value })}
                                />
                            </label>
                            <div className="button-container">
                                <button type="button" onClick={handleUpdateFarmacia}>Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FarmaciasList;
