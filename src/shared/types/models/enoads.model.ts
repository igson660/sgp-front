import { IAddressCreate } from "./address.model";

export interface IEnoadBase {
  readonly name: string;
  readonly cnpj: string;
  readonly foundation_date: string;
  readonly email: string;
  readonly phone: string;
  readonly status: "active" | "inactive";
}

export interface IEnoad extends IEnoadBase {
  readonly id: string;
}

export interface IEnoadCreate extends IEnoadBase {
  readonly address: IAddressCreate;
}

export interface IAddressResponse {
  readonly id: string;
  readonly zip_code: string;
  readonly address: string;
  readonly address_number: string;
  readonly address_complement: string;
  readonly state: string;
  readonly city: string;
  readonly country: string;
}

export interface IEnoadResponse {
  readonly status: "success";
  readonly data: IEnoad & { address: IAddressResponse };
}

export interface IPaginatedResponse<T> {
  readonly count: number;
  readonly next: string | null;
  readonly previous: string | null;
  readonly results: readonly T[];
}
