/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignInMutation } from '../services/auth.service';

const LoginT = () => {
  const [username, setUsername] = useState<string>('sandra');
  const [password, setPassword] = useState<string>('dym123');
  const [error, setError] = useState<string | null>(null);
  const [signIn, { isLoading }] = useSignInMutation();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Usar el hook de RTK Query para iniciar sesión
      const response = await signIn({ username, password }).unwrap();
      
      // Guardar el token en el almacenamiento local
      localStorage.setItem('jwtToken', response.token ?? '');
      console.log('response.data.token', response.user);

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
        <button type="submit" disabled={isLoading}>Login</button>
      </form>
    </div>
  );
};

export default LoginT;
