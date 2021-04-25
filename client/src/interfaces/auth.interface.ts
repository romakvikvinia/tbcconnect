export interface IAuthCredentials {
  username: string;
  password: string;
}

export interface IAuthToken {
  token: string;
  expiresIn: number;
}
