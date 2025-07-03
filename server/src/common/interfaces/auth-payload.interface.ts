export interface AuthPayload {
  sub: string;       // user id
  email: string;
  iat?: number;      // issued at
  exp?: number;      // expiration
}