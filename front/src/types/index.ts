import { ReactNode } from "react";

export interface iClientLogin {
  email: string;
  password: string;
}

export interface iClientRegister {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface iContactRegister {
  id?: string;
  name: string;
  email: string;
  phone: string;
}

export interface iContactResponse extends iContactRegister {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface iParams {
  id?: string;
  param: string;
}

export interface iProviderProps {
  children: ReactNode;
}

export interface iRegisterContact {
  contactData: iContactRegister;
  onClose: () => void;
}
