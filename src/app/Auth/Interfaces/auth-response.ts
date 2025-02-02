export interface LoginInterface {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}
export interface LoginCredentials {
  username: string;
  password: string;
}
