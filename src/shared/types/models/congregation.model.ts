import {
  IAddressCreate,
  IAddressResponse,
  IAddressResponseList,
} from "./address.model";
import { IRegionalResponseList } from "./regional.model";

export interface ICongregationBase {
  readonly name: string;
  readonly regional: string;
  readonly cnpj: string;
  readonly foundation_date: string;
  readonly email: string;
  readonly phone: string;
  readonly status: "active" | "inactive";
}

export interface ICongregationItem extends Omit<ICongregationBase, "regional"> {
  readonly id: string;
  readonly address: IAddressResponseList | IAddressResponse;
  readonly regional: IRegionalResponseList;
}

export interface ICongregationData {
  readonly count: number;
  readonly next: string | null;
  readonly previous: string | null;
  readonly results: ICongregationItem[];
  readonly total_pages: number;
}

export interface ICongregationCreate extends ICongregationBase {
  readonly address: IAddressCreate;
}

export interface ICongregationResponse {
  readonly status: "success";
  readonly data: ICongregationData;
}

export interface ICongregationResponseDetails {
  readonly status: "success";
  readonly data: ICongregationItem;
}

export interface ICongregationResponseList {
  readonly id: string;
  readonly name: string;
}
