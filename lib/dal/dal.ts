'use server'
import {cache} from 'react';
import api from '../axios/axiosConfig';
//Creating a Data Access Layer (DAL) to centralize data requests and authorization logic
 
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
 
export const verifySession = cache(async () => {
  const storedToken = cookies().get('token')?.value;
  const storedUsername = cookies().get('username')?.value;
  const storedExpiresAt = cookies().get('expiresAt')?.value;

 
  // if (!storedUsername || !storedToken) {
  //   redirect('/sign-in');
  // }
 
  return { username: storedUsername, token: storedToken, expiresAt: Number(storedExpiresAt) }
});

export const getUser = cache(async () => {
    const { username, token, expiresAt } = await verifySession()
    if (!username) return null
  
    try {
      const response = await api.get(`/users/${username}`); 
      return response.data; // Retourne les données de l'utilisateur
    } catch (error) {
      console.error('Failed to fetch user:', error);
      return null;
    }
  });