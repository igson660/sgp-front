import { IPaginated } from "@/shared/types/models/global.model";
import toast from "react-hot-toast";

import { api } from "src/config/sgpCore";
import {
  IChurchCreate,
  IChurchResponse,
} from "src/shared/types/models/church.model";

export const listChurchRequest = async (): Promise<
  IPaginated<IChurchResponse>
> => {
  try {
    return await api.url("/church/").get().json<IPaginated<IChurchResponse>>();
  } catch {
    toast.error("Erro ao carregar igrejas.");
    throw new Error("LIST_CHURCH_ERROR");
  }
};

export const retrieveChurchRequest = async (
  id: string
): Promise<IChurchResponse> => {
  try {
    return await api.url(`/church/${id}/`).get().json<IChurchResponse>();
  } catch {
    toast.error("Erro ao carregar igreja.");
    throw new Error("RETRIEVE_CHURCH_ERROR");
  }
};

export const createChurchRequest = async (
  data: IChurchCreate
): Promise<IChurchResponse> => {
  try {
    return await api
      .url("/church/")
      .post(JSON.stringify(data))
      .json<IChurchResponse>();
  } catch {
    toast.error("Erro ao criar igreja.");
    throw new Error("CREATE_CHURCH_ERROR");
  }
};

export const updateChurchRequest = async (
  id: string,
  data: Partial<IChurchCreate>
): Promise<IChurchResponse> => {
  try {
    return await api
      .url(`/church/${id}/`)
      .patch(JSON.stringify(data))
      .json<IChurchResponse>();
  } catch {
    toast.error("Erro ao atualizar igreja.");
    throw new Error("UPDATE_CHURCH_ERROR");
  }
};

export const deleteChurchRequest = async (id: string): Promise<void> => {
  try {
    await api.url(`/church/${id}/`).delete().res();
  } catch {
    toast.error("Erro ao deletar igreja.");
    throw new Error("DELETE_CHURCH_ERROR");
  }
};
