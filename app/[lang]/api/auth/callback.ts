import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { cookies } from 'next/headers';

const TOKEN_URL = 'http://localhost:9000/oauth/token'; // L'URL du serveur d'authentification pour obtenir le jeton
const CLIENT_ID = 'client';
const CLIENT_SECRET = 'secret';
const REDIRECT_URI = 'http://127.0.0.1:3000/login/oauth2/code/gateway';

const callback = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("in the callback");
  const { code } = req.query; // Le code d'autorisation

  if (!code) {
    res.status(400).send('Code de l\'autorisation manquant');
    return;
  }

  // Utiliser l'API cookies pour lire les cookies
  const cookieStore = cookies();
  const codeVerifierCookie = cookieStore.get('code_verifier');

  if (!codeVerifierCookie) {
    res.status(400).json({ error: 'Code verifier manquant' });
    return;
  }

  const codeVerifier = codeVerifierCookie.value;

  if (!codeVerifier) {
    res.status(400).send('Code verifier manquant');
    return;
  }

  try {
    // Échanger le code d'autorisation contre un jeton d'accès
    const response = await axios.post(TOKEN_URL, new URLSearchParams({
      grant_type: 'authorization_code',
      code: code as string,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      code_verifier: codeVerifier,
    }), {
      auth: {
        username: CLIENT_ID,
        password: CLIENT_SECRET,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const { access_token, id_token } = response.data;

    // Utiliser l'API cookies pour définir les cookies
    const responseCookies = cookies();
    responseCookies.set('access_token', access_token, { httpOnly: true, path: '/', sameSite: 'lax' });
    responseCookies.set('id_token', id_token, { httpOnly: true, path: '/', sameSite: 'lax' });

    // Rediriger vers la page protégée après l'authentification
    res.redirect('/protected-page');
  } catch (error: any) {
    console.error('Erreur lors de l\'échange du code d\'autorisation:', error.response?.data || error.message);
    res.status(500).send('Erreur lors de l\'échange du code d\'autorisation');
  }
  
};

export default callback;
