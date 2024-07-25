/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Enviar solicitud de inicio de sesión
      const response = await axios.post(
        'http://localhost:5000/api/v1/signin',
        { username, password },
        { withCredentials: true }
      );

      // Guardar el token en el almacenamiento local
      localStorage.setItem('jwtToken', response.data.token);

      // Redirigir al usuario después de iniciar sesión
      navigate('/dashboard');
    } catch (err: any) {
      setError('Error de inicio de sesión. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
