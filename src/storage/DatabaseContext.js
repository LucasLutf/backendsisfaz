import { createContext, useContext, useEffect, useState } from "react";
import { initializeDatabase } from "./initializeDatabase.js";

// Criação do contexto
const DatabaseContext = createContext();

export const useDatabase = () => useContext(DatabaseContext);

// Provedor do contexto
export const DatabaseProvider = ({ children }) => {
  const [db, setDb] = useState(false);

  useEffect(() => {
    const initDb = async () => {
      try {
        const result = await initializeDatabase();
        setDb(result);
      } catch (error) {
        console.error("Erro ao inicializar o banco de dados:", error);
      }
    };

    initDb();
  }, []);

  if (!db) {
    return null; // Renderiza nada até que o banco de dados esteja pronto
  }

  return (
    <DatabaseContext.Provider value={db}>{children}</DatabaseContext.Provider>
  );
};
