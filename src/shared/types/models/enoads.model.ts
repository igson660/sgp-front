import { IAddressCreate } from "./address.model";

export interface IEnoad {
  id: string;
  name: string;
  cnpj: string;
  foundation_date: string;
  email: string;
  phone: string;
  address: string;
  status: "active" | "inactive";
}

export interface IEnoadCreate {
  name: string;
  cnpj: string;
  foundation_date: string;
  email: string;
  phone: string;
  address: IAddressCreate;
  status?: "active" | "inactive";
}

export interface IEnoadResponse extends IEnoadCreate {
  id: string;
  created_at: string;
  updated_at: string;
}
