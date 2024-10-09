import { initializeDatabase } from "./initializeDatabase";

export const OrdersDatabase = () => {
  const getOrders = async () => {
    const db = await initializeDatabase();
    return await db.getAllAsync("SELECT * FROM Orders");
  };

  const getOrderByCode = async (code) => {
    const db = await initializeDatabase();
    return await db.getFirstAsync(`SELECT * FROM Orders WHERE Code = ${code}`);
  };

  const insertOrder = async (order) => {
    try {
      const db = await initializeDatabase();
      const result = await db.runAsync(`
        INSERT INTO Orders (IdPosOrder, Code, Description, Total, OrderStatus, IdEnterprise)
        VALUES (
          ${order.IdPosOrder},
          ${order.Code},
          '${order.Description}',
          ${order.Total},
          ${order.OrderStatus},
          ${order.IdEnterprise});
      `);
    } catch (error) {
      console.error("Error inserting order:", error);
    }
  };

  return { getOrders, getOrderByCode, insertOrder };
};
