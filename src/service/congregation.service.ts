import {
  ICongregationCreate,
  ICongregationResponse,
  ICongregationResponseDetails,
} from "@/shared/types/models/congregation.model";
import toast from "react-hot-toast";

import { api } from "src/config/sgpCore";

export const listCongregaçãochRequest = async ({
  search = "",
}: {
  search: string;
}): Promise<ICongregationResponse> => {
  try {
    const query = new URLSearchParams();
    if (search) query.append("search", search);

    return await api
      .url(`congregations/?${query.toString()}&page/`)
      .get()
      .json<ICongregationResponse>();
  } catch {
    toast.error("Erro ao carregar Congregações.");
    throw new Error("LIST_ENOAD_ERROR");
  }
};

export const retrieveCongregationRequest = async (
  id: string
): Promise<ICongregationResponseDetails> => {
  try {
    return await api
      .url(`congregations/${id}/`)
      .get()
      .json<ICongregationResponseDetails>();
  } catch {
    toast.error("Erro ao carregar Congregação.");
    throw new Error("RETRIEVE_CONGREGATION_ERROR");
  }
};

export const createCongregationRequest = async (
  data: ICongregationCreate
): Promise<ICongregationResponse> => {
  try {
    toast.success("Congregação cadastrada com sucesso");
    return await api
      .url("congregations/")
      .post(data)
      .json<ICongregationResponse>();
  } catch {
    toast.error("Erro ao cadastrar Congregação.");
    throw new Error("CREATE_CONGRATION_ERROR");
  }
};

export const updateCongregationRequest = async (
  id: string,
  data: Partial<ICongregationCreate>
): Promise<ICongregationResponse> => {
  try {
    toast.success("Congregação atualizada com sucesso");
    return await api
      .url(`congregations/${id}/`)
      .patch(data)
      .json<ICongregationResponse>();
  } catch {
    toast.error("Erro ao atualizar Congregação.");
    throw new Error("UPDATE_CONGREGATION_ERROR");
  }
};

export const deleteCongregationRequest = async (id: string): Promise<void> => {
  try {
    toast.success("Congregação excluida com sucesso");
    await api.url(`congregations/${id}/`).delete().res();
  } catch {
    toast.error("Erro ao deletar Congregação.");
    throw new Error("DELETE_CONGREGATION_ERROR");
  }
};
