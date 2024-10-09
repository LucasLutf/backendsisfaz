import { DataConnection } from "../storage/DataConnection";

const data = async () => await DataConnection().getDataConnection();

export const fetchOrdersFromAPI = async () => {
  try {
    const dataConnection = await data();
    const ip = dataConnection[0].IP;
    const port = dataConnection[0].Port;

    const response = await fetch(`http://${ip}:${port}/orders`);
    if (!response.ok) {
      throw new Error("Erro ao carregar as comandas da API");
    }

    const jsonResponse = await response.json();

    return jsonResponse;
  } catch (error) {
    alert("Erro ao buscar as comandas da API: ", error);
  }
};
