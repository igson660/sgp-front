export interface IPeopleBase {
  name: string;
  cpf: string;
  birth_date: string;
  email: string;
  phone: string;
  address: string;
  church: string;
  status: "active" | "inactive";
}

export interface IPeopleCreate extends Omit<IPeopleBase, "status"> {
  status?: "active" | "inactive";
}

export interface IPeopleResponse extends IPeopleBase {
  id: string;
  created_at: string;
  updated_at: string;
}
