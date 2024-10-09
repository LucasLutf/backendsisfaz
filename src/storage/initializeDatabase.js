import * as SQLite from "expo-sqlite";

export async function initializeDatabase() {
  try {
    const database = SQLite.openDatabaseAsync("appComandas.db");
    (await database).execAsync(`

      CREATE TABLE IF NOT EXISTS DataConnection (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        IP TEXT NOT NULL UNIQUE,
        Port TEXT NOT NULL
      );

      INSERT INTO DataConnection (IP, Port)
      SELECT '192.168.1.61', '3001'
      WHERE NOT EXISTS (SELECT * FROM DataConnection);

      CREATE TABLE IF NOT EXISTS Connection (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        IP TEXT NOT NULL UNIQUE,
        Port TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS Users (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        Name TEXT NOT NULL UNIQUE,
        Password TEXT NOT NULL,
        Status INTEGER NOT NULL,
        IdEnterprise INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS Orders (
        IdPosOrder INTEGER PRIMARY KEY AUTOINCREMENT,
        Code INTEGER NOT NULL UNIQUE,
        Description TEXT NOT NULL,
        Total REAL NOT NULL,
        OrderStatus INTEGER NOT NULL,
        IdEnterprise INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS Products (
        IdProduct INTEGER PRIMARY KEY AUTOINCREMENT,
        Code INTEGER NOT NULL UNIQUE,
        Description TEXT NOT NULL,
        Price REAL NOT NULL,
        Categorie INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS Categories (
        IdCategorie INTEGER PRIMARY KEY AUTOINCREMENT,
        Description TEXT NOT NULL UNIQUE
      );
      `);
    return database;
  } catch (error) {
    alert("Error initializing database:", error);
  }
}
