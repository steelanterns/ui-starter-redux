import { Locale } from "@/i18n.config";
import { z } from "zod";

export interface ResponseBody {
    access_token: string; 
	refresh_token: string;
}
  
  export interface User {
    id: string;
    login: string;
    avatar_url: string;
    email: string;
  }

 export interface LocaleProp {
    lang: Locale;
}

export interface CustomLinkProps {
  href: string
  lang: string
  children: React.ReactNode
  [key: string]: any
}

export interface LoginPayload {
  username: string;
  token: string;
  // refreshToken: string;
  expiresAt: number | Date | null;
}

export interface AuthState {
  username: string | null | undefined;
  token: string | null | undefined;
  refreshToken: string | null;
  expiresAt: number | Date | null;
  isLoading: boolean;
  error: string | null;
};