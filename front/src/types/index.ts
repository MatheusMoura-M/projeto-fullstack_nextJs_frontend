import { ReactNode } from "react";

export interface iClientLogin {
  email: string;
  password: string;
}

export interface iClientRegister {
  name: string;
  email: string;
  password: string;
  phone: number;
}

export interface iProviderProps {
  children: ReactNode;
}
