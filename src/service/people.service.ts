import {
  IPeopleCreate,
  IPeopleResponse,
  IPeopleResponseDetails,
} from "@/shared/types/models/people.model";
import toast from "react-hot-toast";

import { api } from "src/config/sgpCore";

export const listPeopleRequest = async ({
  search = "",
  page = 1,
}: {
  search?: string;
  page?: number;
}): Promise<IPeopleResponse> => {
  try {
    const query = new URLSearchParams();

    if (search) query.append("search", search);
    query.append("page", String(page));

    return await api
      .url(`people/?${query.toString()}`)
      .get()
      .json<IPeopleResponse>();
  } catch {
    toast.error("Erro ao carregar membro.");
    throw new Error("LIST_MEMBER_ERROR");
  }
};

export const retrievePeopleRequest = async (
  id: string
): Promise<IPeopleResponseDetails> => {
  try {
    return await api.url(`people/${id}/`).get().json<IPeopleResponseDetails>();
  } catch {
    toast.error("Erro ao carregar membro.");
    throw new Error("RETRIEVE_People_ERROR");
  }
};

export const createPeopleRequest = async (
  data: IPeopleCreate
): Promise<IPeopleResponse> => {
  try {
    toast.success("membro cadastrada com sucesso");
    return await api.url("people/").post(data).json<IPeopleResponse>();
  } catch {
    toast.error("Erro ao cadastrar membro.");
    throw new Error("CREATE_CONGRATION_ERROR");
  }
};

export const updatePeopleRequest = async (
  id: string,
  data: Partial<IPeopleCreate>
): Promise<IPeopleResponse> => {
  try {
    toast.success("membro atualizada com sucesso");
    return await api.url(`people/${id}/`).patch(data).json<IPeopleResponse>();
  } catch {
    toast.error("Erro ao atualizar membro.");
    throw new Error("UPDATE_People_ERROR");
  }
};

export const deletePeopleRequest = async (id: string): Promise<void> => {
  try {
    toast.success("membro excluida com sucesso");
    await api.url(`people/${id}/`).delete().res();
  } catch {
    toast.error("Erro ao deletar membro.");
    throw new Error("DELETE_People_ERROR");
  }
};
