/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../services/auth.service';

const CurrentUser = () => {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data.user);
      } catch (err: any) {
        setError('Error al obtener la información del usuario.');
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <div>
      <h2>Current User</h2>
      {error && <p>{error}</p>}
      {user ? (
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Avatar Color:</strong> {user.avatarColor}</p>
          <p><strong>Avatar Image:</strong> <img src={user.avatarImage} alt="Avatar" /></p>
          <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CurrentUser;
