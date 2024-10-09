import { initializeDatabase } from "./initializeDatabase";

export const ProductsDatabase = () => {
  const getProducts = async () => {
    const db = await initializeDatabase();
    return await db.getAllAsync("SELECT * FROM Products");
  };

  const insertProduct = async (product) => {
    try {
      const db = await initializeDatabase();
      const result = await db.execAsync(`
        INSERT INTO Products (IdProduct, Code, Description, Price, Categorie)
        VALUES (
          ${product.IdProduct},
          ${product.Code},
          '${product.Description}',
          ${product.SalePrice},
          ${product.IdGroup}
        ); 
      `);
    } catch (error) {
      console.error("Erro ao inserir produto: ", error);
    }
  };

  return { getProducts, insertProduct };
};
