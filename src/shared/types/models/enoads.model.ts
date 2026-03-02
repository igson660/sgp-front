export interface IEnoadBase {
  readonly name: string;
  readonly foundation_date: string;
  readonly status: "active" | "inactive";
}

export interface IEnoadItem extends IEnoadBase {
  readonly id: string;
}

export interface IEnoadData {
  readonly count: number;
  readonly next: string | null;
  readonly previous: string | null;
  readonly results: IEnoadItem[];
  readonly total_pages: number;
}

export interface IEnoadCreate extends IEnoadBase {}

export interface IEnoadResponse {
  readonly status: "success";
  readonly data: IEnoadData;
}

export interface IEnoadResponseDetails {
  readonly status: "success";
  readonly data: IEnoadItem;
}

export interface IEnoadResponseList {
  readonly id: string;
  readonly name: string;
}
