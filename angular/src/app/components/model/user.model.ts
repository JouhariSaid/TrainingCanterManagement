export interface User {
  userId: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  password: string;
  deleted: boolean;
  domains: string[];
}
