import { initializeDatabase } from "./initializeDatabase";

export const UsersDatabase = () => {
  const getUsers = async () => {
    const db = await initializeDatabase();
    return await db.getAllAsync("SELECT * FROM Users");
  };

  const insertUser = async (user) => {
    try {
      const db = await initializeDatabase();
      const result = await db.runAsync(`
        INSERT INTO Users (Id, Name, Password, Status, IdEnterprise)
        VALUES (
          ${user.IdUser},
          '${user.Name.trim()}',
          ${user.Password},
          ${user.Status},
          ${user.IdEnterprise});
      `);
    } catch (error) {
      console.error("Error inserting user:", error);
    }
  };

  return { getUsers, insertUser };
};
