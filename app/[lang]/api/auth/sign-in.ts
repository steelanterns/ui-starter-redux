import { NextApiResponse } from 'next';
import { generateRandomString, generateCodeChallenge } from '@/lib/funcs';

// URL du Gateway pour l'authentification
const GATEWAY_AUTH_URL = 'http://127.0.0.1:8080/oauth2/authorization/gateway';

// Paramètres OAuth2/OpenID Connect
const CLIENT_ID = 'client';
const REDIRECT_URI = 'http://localhost:3000/callback';  // URI de redirection après l'authentification
const SCOPE = 'openid, profile'; // Portée demandée

const SingIn = ( res: NextApiResponse ) => {

  const codeVerifier = generateRandomString(128);
  const codeChallenge = generateCodeChallenge(codeVerifier);

  // Stocker codeVerifier dans un cookie sécurisé ou en session pour le récupérer plus tard
  res.setHeader('Set-Cookie', `code_verifier=${codeVerifier}; HttpOnly; Path=/; SameSite=Lax`);

  // Construire l'URL de redirection vers le Gateway avec PKCE
  const authUrl = `${GATEWAY_AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${encodeURIComponent(SCOPE)}&code_challenge=${codeChallenge}&code_challenge_method=S256`;
  // console.log( "authUrl", authUrl);
  res.redirect(authUrl);
}

export default SingIn;