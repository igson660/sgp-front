import { IPaginated } from "@/shared/types/models/global.model";
import toast from "react-hot-toast";

import { api } from "src/config/sgpCore";
import {
  IEnoadCreate,
  IEnoadResponse,
} from "src/shared/types/models/enoads.model";

export const listEnoadRequest = async (): Promise<
  IPaginated<IEnoadResponse>
> => {
  try {
    return await api.url("/Enoad/").get().json<IPaginated<IEnoadResponse>>();
  } catch {
    toast.error("Erro ao carregar igrejas.");
    throw new Error("LIST_Enoad_ERROR");
  }
};

export const retrieveEnoadRequest = async (
  id: string
): Promise<IEnoadResponse> => {
  try {
    return await api.url(`/Enoad/${id}/`).get().json<IEnoadResponse>();
  } catch {
    toast.error("Erro ao carregar igreja.");
    throw new Error("RETRIEVE_Enoad_ERROR");
  }
};

export const createEnoadRequest = async (
  data: IEnoadCreate
): Promise<IEnoadResponse> => {
  try {
    return await api
      .url("/Enoad/")
      .post(JSON.stringify(data))
      .json<IEnoadResponse>();
  } catch {
    toast.error("Erro ao criar igreja.");
    throw new Error("CREATE_Enoad_ERROR");
  }
};

export const updateEnoadRequest = async (
  id: string,
  data: Partial<IEnoadCreate>
): Promise<IEnoadResponse> => {
  try {
    return await api
      .url(`/Enoad/${id}/`)
      .patch(JSON.stringify(data))
      .json<IEnoadResponse>();
  } catch {
    toast.error("Erro ao atualizar igreja.");
    throw new Error("UPDATE_Enoad_ERROR");
  }
};

export const deleteEnoadRequest = async (id: string): Promise<void> => {
  try {
    await api.url(`/Enoad/${id}/`).delete().res();
  } catch {
    toast.error("Erro ao deletar igreja.");
    throw new Error("DELETE_Enoad_ERROR");
  }
};
