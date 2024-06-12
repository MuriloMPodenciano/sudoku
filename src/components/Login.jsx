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
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div>
                    <input
                        type="text"
                        placeholder='nome'
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder='senha'
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
                <div className='signup'>
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
