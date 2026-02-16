import { IAddressCreate } from "./address.model";

export interface IChurch {
  id: string;
  name: string;
  cnpj: string;
  foundation_date: string;
  email: string;
  phone: string;
  address: string;
  status: "active" | "inactive";
}

export interface IChurchCreate {
  name: string;
  cnpj: string;
  foundation_date: string;
  email: string;
  phone: string;
  address: IAddressCreate;
  status?: "active" | "inactive";
}

export interface IChurchResponse extends IChurchCreate {
  id: string;
  created_at: string;
  updated_at: string;
}
