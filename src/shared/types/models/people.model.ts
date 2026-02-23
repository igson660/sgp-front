import {
  IAddressCreate,
  IAddressItem,
  IAddressResponseList,
} from "./address.model";
import { ICongregationResponseList } from "./congregation.model";

export interface IPeopleBase {
  readonly name: string;
  readonly congregation: string;
  readonly cpf: string;
  readonly birth_date: string;
  readonly email: string;
  readonly phone: string;
  readonly status: "active" | "inactive";
}

export interface IPeopleItem extends Omit<IPeopleBase, "congregation"> {
  readonly id: string;
  readonly address: IAddressResponseList | IAddressItem;
  readonly congregation: ICongregationResponseList;
}

export interface IPeopleData {
  readonly count: number;
  readonly next: string | null;
  readonly previous: string | null;
  readonly results: IPeopleItem[];
  readonly total_pages: number;
}

export interface IPeopleCreate extends IPeopleBase {
  readonly address: IAddressCreate;
}

export interface IPeopleResponse {
  readonly status: "success";
  readonly data: IPeopleData;
}

export interface IPeopleResponseDetails {
  readonly status: "success";
  readonly data: IPeopleItem;
}
