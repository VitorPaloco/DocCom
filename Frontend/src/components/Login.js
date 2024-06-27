import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const API_URL = 'http://localhost:8080'; // URL do seu backend Spring Boot

const Login = () => {
    const navigate = useNavigate();
    const [showCadastro, setShowCadastro] = useState(false);
    const [loginData, setLoginData] = useState({ nomeUSUARIO: '', senhaUsuario: '' });
    const [cadastroData, setCadastroData] = useState({ nomeUSUARIO: '', senhaUsuario: '' });
    const [errorMessage, setErrorMessage] = useState('');

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleCadastroChange = (e) => {
        setCadastroData({ ...cadastroData, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${API_URL}/usuario/login`, loginData);
            if (response.data.success) {
                navigate('/home');
            } else {
                setErrorMessage('Nome ou senha incorretos');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setErrorMessage('Erro ao fazer login');
        }
    };

    const handleCadastro = async () => {
        try {
            const response = await axios.post(`${API_URL}/usuario/cadastrar`, cadastroData);
            if (response.data.success) {
                setShowCadastro(false);
                setCadastroData({ nomeUSUARIO: '', senhaUsuario: '' });
            } else {
                setErrorMessage('Erro ao cadastrar usuário');
            }
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
            setErrorMessage('Erro ao cadastrar');
        }
    };

    const handleShowCadastro = () => {
        setShowCadastro(true);
        setErrorMessage('');
    };

    const handleShowLogin = () => {
        setShowCadastro(false);
        setErrorMessage('');
    };

    return (
        <div className="login-page">
            <header className="header">
                <a href="#" className="logo">DocCom.</a>
                <nav className="navbar">
                    <a href="#" className={!showCadastro ? 'active' : ''} onClick={handleShowLogin}>Login</a>
                    <a href="#" className={showCadastro ? 'active' : ''} onClick={handleShowCadastro}>Cadastrar</a>
                </nav>
            </header>

            <div className="form-container">
                {!showCadastro && (
                    <div className="login-form">
                        <h2>LOGIN</h2>
                        <input
                            type="text"
                            name="nomeUSUARIO"
                            placeholder="Nome"
                            value={loginData.nomeUSUARIO}
                            onChange={handleLoginChange}
                        />
                        <input
                            type="password"
                            name="senhaUsuario"
                            placeholder="Senha"
                            value={loginData.senhaUsuario}
                            onChange={handleLoginChange}
                        />
                        <button onClick={handleLogin}>Entrar</button>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </div>
                )}

                {showCadastro && (
                    <div className="cadastro-form">
                        <h2>CADASTRO</h2>
                        <input
                            type="text"
                            name="nomeUSUARIO"
                            placeholder="Nome"
                            value={cadastroData.nomeUSUARIO}
                            onChange={handleCadastroChange}
                        />
                        <input
                            type="password"
                            name="senhaUsuario"
                            placeholder="Senha"
                            value={cadastroData.senhaUsuario}
                            onChange={handleCadastroChange}
                        />
                        <button onClick={handleCadastro}>Cadastrar</button>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
