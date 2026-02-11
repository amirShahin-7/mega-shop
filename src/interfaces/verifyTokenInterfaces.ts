export interface VerifyTokenResponse {
  message: string;
  decoded?: DecodedToken;
  statusMsg?: string; // For error case
}

export interface DecodedToken {
  id: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}
