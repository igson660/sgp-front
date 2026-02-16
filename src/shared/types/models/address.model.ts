export interface IAddressBase {
  zip_code: string;
  address: string;
  address_number: string;
  address_complement?: string;
  state: string;
  city: string;
  country: string;
}

export interface IAddressCreate extends IAddressBase {}

export interface IAddressResponse extends IAddressBase {
  status: string;
  data: {
    zip_code: string;
    address: string;
    address_number: string;
    address_complement?: string;
    state: string;
    city: string;
    country: string;
  };
}
