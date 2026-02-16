import {
  IEnoadCreate,
  IEnoadResponse,
} from "@/shared/types/models/enoads.model";
import { IPaginated } from "@/shared/types/models/global.model";
import toast from "react-hot-toast";

import { api } from "src/config/sgpCore";

export const listEnoadRequest = async (): Promise<
  IPaginated<IEnoadResponse>
> => {
  try {
    return await api.url("enoads/").get().json<IPaginated<IEnoadResponse>>();
  } catch {
    toast.error("Erro ao carregar ENOADs.");
    throw new Error("LIST_Enoad_ERROR");
  }
};

export const retrieveEnoadRequest = async (
  id: string
): Promise<IEnoadCreate> => {
  try {
    const response = await api
      .url(`enoads/${id}/`)
      .get()
      .json<IEnoadResponse>();
    return response.data;
  } catch {
    toast.error("Erro ao carregar ENOAD.");
    throw new Error("RETRIEVE_Enoad_ERROR");
  }
};

export const createEnoadRequest = async (
  data: IEnoadCreate
): Promise<IEnoadResponse> => {
  try {
    return await api.url("enoads/").post(data).json<IEnoadResponse>();
  } catch {
    toast.error("Erro ao cadastrar ENOAD.");
    throw new Error("CREATE_Enoad_ERROR");
  }
};

export const updateEnoadRequest = async (
  id: string,
  data: Partial<IEnoadCreate>
): Promise<IEnoadResponse> => {
  try {
    return await api.url(`enoads/${id}/`).patch(data).json<IEnoadResponse>();
  } catch {
    toast.error("Erro ao atualizar ENOAD.");
    throw new Error("UPDATE_Enoad_ERROR");
  }
};

export const deleteEnoadRequest = async (id: string): Promise<void> => {
  try {
    await api.url(`enoads/${id}/`).delete().res();
  } catch {
    toast.error("Erro ao deletar ENOAD.");
    throw new Error("DELETE_Enoad_ERROR");
  }
};
