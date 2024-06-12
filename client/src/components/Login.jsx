import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import "./Login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                localStorage.setItem('token', data.token);
                navigate('/board');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="Login-container">
            <form className="Login-form" onSubmit={handleSubmit}>
                <h1 className="Login-title">Login</h1>
                <div>
                    <input
                        type="text"
                        placeholder='nome'
                        onChange={(event) => setUsername(event.target.value)}
                        className="Login-input"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder='senha'
                        onChange={(event) => setPassword(event.target.value)}
                        className="Login-input"
                    />
                </div>
                <button type="submit" className="Login-button">Login</button>
                <div className="Login-signup">
                    <p>
                        <span>Não possui cadastro?</span>
                        <a href='/register'> Registrar</a>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Login;
