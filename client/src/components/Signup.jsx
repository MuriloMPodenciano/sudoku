import React, { useState } from 'react';
import "./Signup.css";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="Signup-container">
            <form className="Signup-form" onSubmit={handleSubmit}>
                <h1 className="Signup-title">Cadastro</h1>
                <div>
                    <input
                        type="text"
                        placeholder='nome'
                        onChange={(event) => setUsername(event.target.value)}
                        className="Signup-input"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder='senha'
                        onChange={(event) => setPassword(event.target.value)}
                        className="Signup-input"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder='confirmar senha'
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        className="Signup-input"
                    />
                </div>
                <button type="submit" className="Signup-button">Registrar</button>
                <div className="Signup-login">
                    <p>
                        <span>Já possui cadastro?</span>
                        <a href='/login'> Login</a>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Signup;
