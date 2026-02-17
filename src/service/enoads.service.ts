import {
  IEnoadCreate,
  IEnoadResponse,
  IEnoadResponseDetails,
} from "@/shared/types/models/enoads.model";
import toast from "react-hot-toast";

import { api } from "src/config/sgpCore";

export const listEnoadRequest = async ({
  search = "",
}: {
  search: string;
}): Promise<IEnoadResponse> => {
  try {
    const query = new URLSearchParams();
    if (search) query.append("search", search);

    return await api
      .url(`enoads/?${query.toString()}&page/`)
      .get()
      .json<IEnoadResponse>();
  } catch {
    toast.error("Erro ao carregar ENOADs.");
    throw new Error("LIST_ENOAD_ERROR");
  }
};

export const retrieveEnoadRequest = async (
  id: string
): Promise<IEnoadResponseDetails> => {
  try {
    return await api.url(`enoads/${id}/`).get().json<IEnoadResponseDetails>();
  } catch {
    toast.error("Erro ao carregar ENOAD.");
    throw new Error("RETRIEVE_Enoad_ERROR");
  }
};

export const createEnoadRequest = async (
  data: IEnoadCreate
): Promise<IEnoadResponse> => {
  try {
    toast.success("ENOAD criado com sucesso");
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
    toast.success("ENOAD atualizado com sucesso");
    return await api.url(`enoads/${id}/`).patch(data).json<IEnoadResponse>();
  } catch {
    toast.error("Erro ao atualizar ENOAD.");
    throw new Error("UPDATE_Enoad_ERROR");
  }
};

export const deleteEnoadRequest = async (id: string): Promise<void> => {
  try {
    toast.success("ENOAD excluido com sucesso");
    await api.url(`enoads/${id}/`).delete().res();
  } catch {
    toast.error("Erro ao deletar ENOAD.");
    throw new Error("DELETE_Enoad_ERROR");
  }
};
