export interface User {
  id: string;
  name?: string;
  email: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginData {
  email: string;
  password: string;
}
