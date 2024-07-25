/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignUpMutation } from '../services/auth.service';

const RegisterT = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [avatarColor, setAvatarColor] = useState<string>('blue');
  const [avatarImage, setAvatarImage] = useState<string>('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA0gAAAMyAQMAAABtkHM/AAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAAFiS0dEAf8CLd4AAABrSURBVBgZ7cGBAAAAAMOg+1NP4AjVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAjgBSwwABwrL8wAAAAABJRU5ErkJggg==');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [signUp, { isLoading }] = useSignUpMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Usar el hook de RTK Query para registrar al usuario
      const response = await signUp({
        username, password, email, avatarColor, avatarImage,
  
        browserName: undefined,
        deviceType: undefined
      }).unwrap();
      
      // Guardar el token en el almacenamiento local
      localStorage.setItem('jwtToken', response.token ?? '');
      console.log('response.token', response.token);

      // Redirigir al usuario después de registrarse
      navigate('/dashboard');
    } catch (err: any) {
      setError('Error de registro. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
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
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Avatar Color</label>
          <input
            type="text"
            value={avatarColor}
            onChange={(e) => setAvatarColor(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Avatar Image</label>
          <input
            type="text"
            value={avatarImage}
            onChange={(e) => setAvatarImage(e.target.value)}
            required
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit" disabled={isLoading}>Register</button>
      </form>
    </div>
  );
};

export default RegisterT;
