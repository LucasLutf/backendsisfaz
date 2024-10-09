import { DataConnection } from "../storage/DataConnection";

const data = async () => await DataConnection().getDataConnection();

export const fetchUsersFromAPI = async () => {
  const dataConnection = await data();
  const ip = dataConnection[0].IP;
  const port = dataConnection[0].Port;

  try {
    const response = await fetch(`http://${ip}:${port}/users`);
    if (!response.ok) {
      throw new Error("Erro ao carregar usuários");
    }

    const jsonResponse = await response.json();

    const users = jsonResponse.detail.result;

    return users;
  } catch (error) {
    console.error("Erro ao buscar usuários da API:", error);
  }
};
