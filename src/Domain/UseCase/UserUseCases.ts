import { HttpHelperType } from "../../Helper/HttpHelper";
import { User } from "@prisma/client";

type ResponseBody = User[];

export async function getUsersUseCase(fetch: HttpHelperType) {
  const response = await fetch.get<ResponseBody>("/api/user/get-all");

  return response;
}
