import axiosClient from "../api/axiosClient";

interface LoginResponse {
  access_token: string;
  user: any;
}

export const loginAuth = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const response = await axiosClient.post("/auth/login", {
    username,
    password,
  });
  return response.data;
};
