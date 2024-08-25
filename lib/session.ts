import 'server-only';
import { cookies } from 'next/headers';
 
export async function createSession(username: string, jwt: any) {
    const expiresAt = new Date(Date.now() + jwt.tokenValidity * 60 * 1000).getTime();
  
    cookies().set('token', jwt.accessToken, {
      httpOnly: true,
      maxAge: jwt.tokenValidity * 60,
    //   secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: "lax",
    });
  
    // cookies().set("refresh_token", jwt.refreshToken, {
    //   path: "/",
    //   httpOnly: true,
    //   maxAge: jwt.tokenValidity * 60 * 2,
    //   sameSite: "lax",
    // });

    cookies().set("expiresAt", expiresAt.toString(), {
      path: "/",
      httpOnly: true,
      maxAge: jwt.tokenValidity * 60 * 2,
      sameSite: "lax",
    });
  
    cookies().set("username", username, {
      path: "/",
      httpOnly: true,
      maxAge: jwt.tokenValidity * 60,
      sameSite: "lax",
    });
  
    return { 
        username, 
      token: jwt.accessToken, 
      // refreshToken: jwt.refreshToken, 
      expiresAt 
    };
  };

  export async function updateSession(username: string, jwt: any) {
    const tokenStored = cookies().get('token')?.value;
    // const refreshTokenStored = cookies().get('refresh_token')?.value;
    const usernameStored = cookies().get('username')?.value;
   
    if (!usernameStored || !tokenStored) {
      return null
    }

      // Optionnel : Vérifier si le token actuel est encore valide
  // Si oui, vous pourriez choisir de ne pas le mettre à jour
  // const currentUser = JSON.parse(userStored);
  // if (currentUser.id === user.id && tokenIsStillValid(tokenStored)) {
  //   return { user: currentUser, token: tokenStored, refreshToken: refreshTokenStored };
  // }

   
    return createSession(username, jwt);
  };

  export function deleteSession() {
    cookies().delete('token');
    // cookies().delete('refresh_token');
    cookies().delete('username');
  }