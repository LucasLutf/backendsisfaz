import { DataConnection } from "../storage/DataConnection";

const data = async () => await DataConnection().getDataConnection();

export const fetchProductsFromAPI = async () => {
  const dataConnection = await data();
  const ip = dataConnection[0].IP;
  const port = dataConnection[0].Port;

  try {
    const response = await fetch(`http://${ip}:${port}/products`);
    if (!response.ok) {
      throw new Error("Erro ao carregar os produtos da API");
    }

    const jsonResponse = await response.json();

    return jsonResponse;
  } catch (error) {
    console.error("Erro ao buscar os produtos da API: ", error);
  }
};
