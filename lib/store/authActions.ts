'use server'

import { redirect } from 'next/navigation';
import api from '../axios/axiosConfig';
import { createSession, updateSession, deleteSession } from '../session';

export async function loginAction(username: string, password: string) {
  try {

    const response = await api.post('/login', { username, password }); 
    const { user, jwt } = response.data;

    return createSession(user.username, jwt);
  } catch (error: any) {
    throw error.response.data;
  }
}

export async function refreshTokenAction(token: string) {
    try {
        const response = await api.post('/refresh-token', { token });

        const { user, jwt } = response.data;
        
        return updateSession(user.username, jwt);
      } catch (error: any) {
        throw error.response.data;
      }
  }

  export async function logoutAction() {
    deleteSession();

    redirect('/sign-in');
  }