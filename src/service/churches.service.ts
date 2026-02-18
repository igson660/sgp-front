import {
  IChurchCreate,
  IChurchResponse,
  IChurchResponseDetails,
} from "@/shared/types/models/church.model";

import toast from "react-hot-toast";

import { api } from "src/config/sgpCore";

export const listChurchRequest = async ({
  search = "",
}: {
  search: string;
}): Promise<IChurchResponse> => {
  try {
    const query = new URLSearchParams();
    if (search) query.append("search", search);

    return await api
      .url(`churches/?${query.toString()}&page/`)
      .get()
      .json<IChurchResponse>();
  } catch {
    toast.error("Erro ao carregar ENOADs.");
    throw new Error("LIST_ENOAD_ERROR");
  }
};

export const retrieveChurchRequest = async (
  id: string
): Promise<IChurchResponseDetails> => {
  try {
    return await api
      .url(`churches/${id}/`)
      .get()
      .json<IChurchResponseDetails>();
  } catch {
    toast.error("Erro ao carregar Igreja.");
    throw new Error("RETRIEVE_Church_ERROR");
  }
};

export const createChurchRequest = async (
  data: IChurchCreate
): Promise<IChurchResponse> => {
  try {
    toast.success("Igreja cadastrada com sucesso");
    return await api.url("churches/").post(data).json<IChurchResponse>();
  } catch {
    toast.error("Erro ao cadastrar Igreja.");
    throw new Error("CREATE_Church_ERROR");
  }
};

export const updateChurchRequest = async (
  id: string,
  data: Partial<IChurchCreate>
): Promise<IChurchResponse> => {
  try {
    toast.success("Igreja atualizada com sucesso");
    return await api.url(`churches/${id}/`).patch(data).json<IChurchResponse>();
  } catch {
    toast.error("Erro ao atualizar Church.");
    throw new Error("UPDATE_Church_ERROR");
  }
};

export const deleteChurchRequest = async (id: string): Promise<void> => {
  try {
    toast.success("Igreja excluida com sucesso");
    await api.url(`churches/${id}/`).delete().res();
  } catch {
    toast.error("Erro ao deletar Church.");
    throw new Error("DELETE_Church_ERROR");
  }
};
