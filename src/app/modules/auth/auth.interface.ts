import { Role } from "@prisma/client";

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  fullName: string;
  email: string;
  password: string;
  role: Role;
}