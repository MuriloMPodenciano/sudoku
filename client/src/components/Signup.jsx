import React, { useState } from 'react';
import "./Signup.css";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        console.log(username, password);
    }

    return (
        <div className="Signup-container">
            <form className="Signup-form" onSubmit={handleSubmit}>
                <h1 className="Signup-title">Registrar</h1>
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
                        <a href='#'> Login</a>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Signup;
