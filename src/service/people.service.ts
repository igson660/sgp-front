import { IPaginated } from "@/shared/types/models/global.model";
import toast from "react-hot-toast";

import { api } from "src/config/sgpCore";
import {
  IPeopleCreate,
  IPeopleResponse,
} from "src/shared/types/models/people.model";

export const listPeopleRequest = async (): Promise<
  IPaginated<IPeopleResponse>
> => {
  try {
    return await api.url("/people/").get().json<IPaginated<IPeopleResponse>>();
  } catch {
    toast.error("Erro ao carregar pessoas.");
    throw new Error("LIST_PEOPLE_ERROR");
  }
};

export const retrievePeopleRequest = async (
  id: string
): Promise<IPeopleResponse> => {
  try {
    return await api.url(`/people/${id}/`).get().json<IPeopleResponse>();
  } catch {
    toast.error("Erro ao carregar pessoa.");
    throw new Error("RETRIEVE_PEOPLE_ERROR");
  }
};

export const createPeopleRequest = async (
  data: IPeopleCreate
): Promise<IPeopleResponse> => {
  try {
    return await api
      .url("/people/")
      .post(JSON.stringify(data))
      .json<IPeopleResponse>();
  } catch {
    toast.error("Erro ao criar pessoa.");
    throw new Error("CREATE_PEOPLE_ERROR");
  }
};

export const updatePeopleRequest = async (
  id: string,
  data: Partial<IPeopleCreate>
): Promise<IPeopleResponse> => {
  try {
    return await api
      .url(`/people/${id}/`)
      .patch(JSON.stringify(data))
      .json<IPeopleResponse>();
  } catch {
    toast.error("Erro ao atualizar pessoa.");
    throw new Error("UPDATE_PEOPLE_ERROR");
  }
};

export const deletePeopleRequest = async (id: string): Promise<void> => {
  try {
    await api.url(`/people/${id}/`).delete().res();
  } catch {
    toast.error("Erro ao deletar pessoa.");
    throw new Error("DELETE_PEOPLE_ERROR");
  }
};
