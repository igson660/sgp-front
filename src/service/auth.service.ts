import toast from "react-hot-toast";

import { api } from "src/config/sgpCore";
import { ICredentials } from "~/shared/types/models/authCredentials.model";
import { IEncodedToken } from "~/shared/types/models/token.model";
import { IUser } from "~/shared/types/models/user.model";

export const signRequest = async (
  credentials: ICredentials
): Promise<IEncodedToken> => {
  return api
    .url("/login/")
    .headers({ "Content-Type": "application/json" })
    .post(JSON.stringify(credentials))
    .json()
    .catch(() =>
      toast.error("Verifique suas credenciais e tente novamente.")
    ) as unknown as IEncodedToken;
};

export const getCurrentUserRequest = async (): Promise<IUser> => {
  return api
    .url("/user/current/")
    .headers({ "Content-Type": "application/json" })
    .get()
    .json()
    .catch(error => {
      console.error(error);
    }) as unknown as IUser;
};
