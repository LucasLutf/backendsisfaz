import NetInfo from "@react-native-community/netinfo";
import { fetchUsersFromAPI } from "../services/UsersServices";
import { fetchOrdersFromAPI } from "../services/OrderServices";
import { UsersDatabase } from "../storage/UsersDatabase";
import { OrdersDatabase } from "../storage/OrdersDatabase";
import { fetchProductsFromAPI } from "../services/ProductsServices";
import { ProductsDatabase } from "../storage/ProductsDatabase";

export const SyncService = {
  async checkInternetConnection() {
    const state = await NetInfo.fetch();
    return state.isConnected;
  },

  async syncData() {
    const isConnected = await this.checkInternetConnection();

    if (isConnected) {
      console.log("Sincronizando dados...");

      this.loadUsers();
      this.loadOrders();
      this.loadProducts();
    } else {
      alert(
        "Sem conexão com a internet. A sincronização será feita mais tarde."
      );
    }
  },

  async loadUsers() {
    try {
      const apiUsers = await fetchUsersFromAPI();
      if (apiUsers) {
        const existingUsers = await UsersDatabase().getUsers();
        for (const user of apiUsers) {
          const userExists = existingUsers.find(
            (dbUser) => dbUser.Id === user.IdUser
          );

          if (!userExists) {
            await UsersDatabase().insertUser(user);
            // console.log("Usuário inserido no banco local: ", user.Name);
          } else {
            // console.log("Usuário já existe no banco local: ", user.Name);
          }
        }
      }
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    }
  },

  async loadOrders() {
    try {
      const apiOrders = await fetchOrdersFromAPI();
      if (apiOrders) {
        const existingOrders = await OrdersDatabase().getOrders();
        for (const order of apiOrders) {
          const orderExists = existingOrders.find(
            (dbOrder) => dbOrder.IdPosOrder === order.IdPosOrder
          );

          if (!orderExists) {
            await OrdersDatabase().insertOrder(order);
          }
        }
      }
    } catch (error) {
      console.error("Erro ao carregar comandas:", error);
    }
  },

  async loadProducts() {
    try {
      const apiProducts = await fetchProductsFromAPI();
      if (apiProducts) {
        const existingProducts = await ProductsDatabase().getProducts();
        for (const product of apiProducts) {
          const productExists = existingProducts.find(
            (dbproduct) => dbproduct.IdProduct == product.IdProduct
          );

          if (!productExists) {
            await ProductsDatabase().insertProduct(product);
          }
        }
      }
    } catch (error) {
      console.error("Erro ao carregar os produtos: ", error);
    }
  },
};
