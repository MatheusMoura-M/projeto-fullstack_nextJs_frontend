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

export interface iContactRegister {
  name: string;
  email: string;
  phone: number;
}

export interface iContactResponse extends iContactRegister {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface iProviderProps {
  children: ReactNode;
}
