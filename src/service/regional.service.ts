import {
  IRegionalCreate,
  IRegionalResponse,
  IRegionalResponseDetails,
} from "@/shared/types/models/regional.model";
import toast from "react-hot-toast";

import { api } from "src/config/sgpCore";

export const listRegionalchRequest = async ({
  search = "",
}: {
  search: string;
}): Promise<IRegionalResponse> => {
  try {
    const query = new URLSearchParams();
    if (search) query.append("search", search);

    return await api
      .url(`enoads/?${query.toString()}&page/`)
      .get()
      .json<IRegionalResponse>();
  } catch {
    toast.error("Erro ao carregar ENOADs.");
    throw new Error("LIST_ENOAD_ERROR");
  }
};

export const retrieveRegionalRequest = async (
  id: string
): Promise<IRegionalResponseDetails> => {
  try {
    return await api
      .url(`regionals/${id}/`)
      .get()
      .json<IRegionalResponseDetails>();
  } catch {
    toast.error("Erro ao carregar Regional.");
    throw new Error("RETRIEVE_REGIONAL_ERROR");
  }
};

export const createRegionalRequest = async (
  data: IRegionalCreate
): Promise<IRegionalResponse> => {
  try {
    toast.success("Regional cadastrada com sucesso");
    return await api.url("regionals/").post(data).json<IRegionalResponse>();
  } catch {
    toast.error("Erro ao cadastrar Regional.");
    throw new Error("CREATE_REGIONAL_ERROR");
  }
};

export const updateRegionalRequest = async (
  id: string,
  data: Partial<IRegionalCreate>
): Promise<IRegionalResponse> => {
  try {
    toast.success("Regional atualizada com sucesso");
    return await api
      .url(`regionals/${id}/`)
      .patch(data)
      .json<IRegionalResponse>();
  } catch {
    toast.error("Erro ao atualizar Regional.");
    throw new Error("UPDATE_REGINAL_ERROR");
  }
};

export const deleteRegionalRequest = async (id: string): Promise<void> => {
  try {
    toast.success("Regional excluida com sucesso");
    await api.url(`regionals/${id}/`).delete().res();
  } catch {
    toast.error("Erro ao deletar Regional.");
    throw new Error("DELETE_REGIONAL_ERROR");
  }
};
