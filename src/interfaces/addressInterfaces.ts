export interface AddressResponse {
  status?: string;
  message: string;
  data?: UserAddress[];
}

export interface UserAddress {
  _id?: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

// ______________

export interface UserAddressesSuccess {
  results: number;
  status: string;
  data: UserAddress[];
}

export interface AddressError {
  statusMsg: string;
  message: string;
}

export type GetUserAddressesResponse = UserAddressesSuccess | AddressError;
