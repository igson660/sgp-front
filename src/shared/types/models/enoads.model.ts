import {
  IAddressCreate,
  IAddressResponse,
  IAddressResponseList,
} from "./address.model";

export interface IEnoadBase {
  readonly name: string;
  readonly cnpj: string;
  readonly foundation_date: string;
  readonly email: string;
  readonly phone: string;
  readonly status: "active" | "inactive";
}

export interface IEnoadItem extends IEnoadBase {
  readonly id: string;
  readonly address: IAddressResponseList | IAddressResponse;
}

export interface IEnoadData {
  readonly count: number;
  readonly next: string | null;
  readonly previous: string | null;
  readonly results: IEnoadItem[];
  readonly total_pages: number;
}

export interface IEnoadCreate extends IEnoadBase {
  readonly address: IAddressCreate;
}

export interface IEnoadResponse {
  readonly status: "success";
  readonly data: IEnoadData;
}

export interface IEnoadResponseDetails {
  readonly status: "success";
  readonly data: IEnoadItem;
}
