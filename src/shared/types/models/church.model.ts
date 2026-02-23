import {
  IAddressCreate,
  IAddressItem,
  IAddressResponseList,
} from "./address.model";
import { IEnoadResponseList } from "./enoads.model";

export interface IChurchBase {
  readonly name: string;
  readonly enoad: string;
  readonly cnpj: string;
  readonly foundation_date: string;
  readonly email: string;
  readonly phone: string;
  readonly status: "active" | "inactive";
}

export interface IChurchItem extends Omit<IChurchBase, "enoad"> {
  readonly id: string;
  readonly address: IAddressResponseList | IAddressItem;
  readonly enoad: IEnoadResponseList;
}

export interface IChurchData {
  readonly count: number;
  readonly next: string | null;
  readonly previous: string | null;
  readonly results: IChurchItem[];
  readonly total_pages: number;
}

export interface IChurchCreate extends IChurchBase {
  readonly address: IAddressCreate;
}

export interface IChurchResponse {
  readonly status: "success";
  readonly data: IChurchData;
}

export interface IChurchResponseDetails {
  readonly status: "success";
  readonly data: IChurchItem;
}

export interface IChurchResponseList {
  readonly id: string;
  readonly name: string;
}
