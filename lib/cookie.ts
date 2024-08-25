import { NextApiRequest, NextApiResponse } from 'next';

// Fonction pour parser les cookies
export const parseCookies = (req: NextApiRequest) => {
    const cookieHeader = req.headers.cookie || '';
    const cookies: { [key: string]: string } = {};
  
    cookieHeader.split(';').forEach((cookie) => {
      const [key, value] = cookie.trim().split('=');
      if (key && value) {
        cookies[key] = decodeURIComponent(value);
      }
    });
  
    return cookies;
  };
  
  // Fonction pour définir les cookies
  export const setCookie = (res: NextApiResponse, name: string, value: string, options: { [key: string]: any } = {}) => {
    let cookieString = `${name}=${encodeURIComponent(value)};`;
  
    if (options.httpOnly) {
      cookieString += ' HttpOnly;';
    }
  
    if (options.secure) {
      cookieString += ' Secure;';
    }
  
    if (options.path) {
      cookieString += ` Path=${options.path};`;
    }
  
    if (options.sameSite) {
      cookieString += ` SameSite=${options.sameSite};`;
    }
  
    res.setHeader('Set-Cookie', cookieString);
  };