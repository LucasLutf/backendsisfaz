import { initializeDatabase } from "./initializeDatabase";

export const DataConnection = () => {
  const getDataConnection = async () => {
    const db = await initializeDatabase();
    return await db.getAllAsync("SELECT * FROM DataConnection");
  };

  const updateDataConnection = async (dataConnection) => {
    try {
      const db = await initializeDatabase();
      const result = await db.execAsync(
        "UPDATE DataConnection SET Hostname = ?, Port = ? WHERE Id = ?",
        [dataConnection.Hostname, dataConnection.Port, 1]
      );

      if (result.rowsAffected > 0) {
        alert("Dados de conexão atualizados com sucesso!");
      } else {
        alert("Id de conexão não encontrado");
      }
    } catch (error) {
      alert("Erro ao atualizar os dados de conexão no banco");
    }
  };

  return { getDataConnection, updateDataConnection };
};
