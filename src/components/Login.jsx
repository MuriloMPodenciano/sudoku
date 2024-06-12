import React, { useState } from 'react';
import "./Login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(username, password);
    }

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
                        <a href='#'> Registrar</a>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Login;
