'use client'

import { useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { login, logout, refreshToken, checkSession } from '../store/authSlice';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { username,  isLoading, error, token, expiresAt } = useSelector((state: RootState) => state.auth);

  // const handleCheckSession = useCallback(() => {
  //   dispatch(checkSession());
  // }, [dispatch]);
  const isAuthenticated = useMemo(() => !!token, [token]);

  const handleLogin = useCallback(async (username: string, password: string) => {
    try {
      await dispatch(login({ username, password })).unwrap();
      // router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    // router.push('/sign-in');
  }, [dispatch]);

  const handleRefreshToken = useCallback(async () => {
    try {
      await dispatch(refreshToken()).unwrap();
    } catch (error) {
      console.error('Token refresh failed:', error);
      handleLogout();
    }
  }, [dispatch, handleLogout]);

  // Effet pour gérer le rafraîchissement automatique du token
  useEffect(() => {
    if (token && expiresAt) {
      const expiresAtMs = typeof expiresAt === 'number'
        ? expiresAt
        : expiresAt instanceof Date
          ? expiresAt.getTime()
          : 0;

      const timeUntilExpire = expiresAtMs - Date.now();
      const refreshBuffer = 60000; // Refresh 1 minute before expiration

      if (timeUntilExpire > 0) {
        const timeoutId = setTimeout(() => {
          handleRefreshToken();
        }, Math.max(timeUntilExpire - refreshBuffer, 0));

        return () => clearTimeout(timeoutId);
      }
    }
  }, [token, expiresAt, handleRefreshToken]);

  useEffect(() => {
    dispatch(checkSession());
  }, [dispatch]);

  return {
    username,
    isAuthenticated,
    isLoading,
    error,
    login: handleLogin,
    logout: handleLogout,
    refreshToken: handleRefreshToken,
  };
};



// 'use client'

// import { useEffect, useCallback, useMemo } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '../store/store';
// import { login, logout, refreshToken, checkSession } from '../store/authSlice';
// import { useRouter } from 'next/navigation'; 

// export const useAuth = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const router = useRouter();
//   const { username, token, isLoading, error, expiresAt, refreshToken: refreshTokenValue } = useSelector((state: RootState) => state.auth);
  

//   const isAuthenticated = useMemo(() => !!token, [token]);

//   const handleRefreshToken = useCallback(async () => {
//     try {
//       await dispatch(refreshToken()).unwrap();
//     } catch (error) {
//       console.error('Token refresh failed:', error);
//       handleLogout();
//     }
//   }, [dispatch]);

//   useEffect(() => {
//     if (token && expiresAt) {
//       const expiresAtMs = typeof expiresAt === 'number' 
//         ? expiresAt 
//         : expiresAt instanceof Date 
//           ? expiresAt.getTime() 
//           : 0;
  
//       const timeUntilExpire = expiresAtMs - Date.now();
//       const refreshBuffer = 60000; // Refresh 1 minute before expiration
      
//       if (timeUntilExpire > 0) {
//         const timeoutId = setTimeout(() => {
//           handleRefreshToken();
//         }, Math.max(timeUntilExpire - refreshBuffer, 0));
  
//         return () => clearTimeout(timeoutId);
//       }
//     }
//   }, [token, expiresAt, handleRefreshToken]);

//   const handleLogin = useCallback(async (username: string, password: string) => {
//     try {
//       await dispatch(login({ username, password })).unwrap();
//       // router.push('/dashboard');
//     } catch (error) {
//       console.error('Login failed:', error);
//     }
//   }, [dispatch, router]);

//   const handleLogout = useCallback(() => {
//     dispatch(logout());
//     // router.push('/login');
//   }, [dispatch, router]);

//   const checkAuthStatus = useCallback(async () => {
//     if (refreshTokenValue && !token) {
//       try {
//         await handleRefreshToken();
//       } catch (error) {
//         console.error('Auth check failed:', error);
//       }
//     }
//   }, [refreshTokenValue, token, handleRefreshToken]);

//   useEffect(() => {
//     checkAuthStatus();
//   }, [checkAuthStatus]);

//   return {
//     username,
//     token,
//     isLoading,
//     error,
//     isAuthenticated,
//     login: handleLogin,
//     logout: handleLogout,
//     refreshToken: handleRefreshToken,
//     checkAuthStatus,
//   };
// };