'use client'

import React from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import CustomLink from '../custom-link';

import { useRouter } from 'next/navigation';

interface AuthenticationNavProps {
    lang: string;
    navigation: {
        signIn: string;
        singUp: string;
        logout: string;
    };
}

const AuthenticationNav: React.FC<AuthenticationNavProps> = ({ lang, navigation }) => {
    const { isAuthenticated, logout, username } = useAuth();
    const router = useRouter();
    console.log("isAuthenticated:", isAuthenticated);
    console.log("username:", username);

    const handleLogout = () => {
        logout();
        router.push(`/${lang}`);
    };

    if (!isAuthenticated) {
        return (
            <>
                <li>
                    <CustomLink href={`/sign-in`} lang={lang}>
                        {navigation.signIn}
                    </CustomLink>
                </li>
                <li>
                    <CustomLink href={`/sign-up`} lang={lang}>
                        {navigation.singUp}
                    </CustomLink>
                </li>
            </>
        );
    }

    return (
        <>
            <li>
                <span className="text-gray-600">Welcome, {username}</span>
            </li>
            <li>
                <button
                    onClick={handleLogout}
                    className="text-blue-600 hover:text-blue-800 transition duration-300"
                >
                    {navigation.logout || 'Logout'}
                </button>
            </li>
        </>
    );
};

export default AuthenticationNav;