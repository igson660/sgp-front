import {
  IAddressCreate,
  IAddressItem,
  IAddressResponseList,
} from "./address.model";
import { IEnoadResponseList } from "./enoads.model";

export interface IRegionalBase {
  readonly name: string;
  readonly church: string;
  readonly cnpj: string;
  readonly foundation_date: string;
  readonly email: string;
  readonly phone: string;
  readonly status: "active" | "inactive";
}

export interface IRegionalItem extends Omit<IRegionalBase, "church"> {
  readonly id: string;
  readonly address: IAddressResponseList | IAddressItem;
  readonly church: IEnoadResponseList;
}

export interface IRegionalData {
  readonly count: number;
  readonly next: string | null;
  readonly previous: string | null;
  readonly results: IRegionalItem[];
  readonly total_pages: number;
}

export interface IRegionalCreate extends IRegionalBase {
  readonly address: IAddressCreate;
}

export interface IRegionalResponse {
  readonly status: "success";
  readonly data: IRegionalData;
}

export interface IRegionalResponseDetails {
  readonly status: "success";
  readonly data: IRegionalItem;
}

export interface IRegionalResponseList {
  readonly id: string;
  readonly name: string;
}
