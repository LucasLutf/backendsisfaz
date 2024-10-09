import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../src/screens/LoginScreen";
import HomeScreen from "../src/screens/HomeScreen";
import ProductScreen from "../src/screens/ProductScreen";
import CustomHeader from "../src/components/CustomHeader";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Tela de Login - Ícone de usuário */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            header: () => (
              <CustomHeader
                title="Login"
                showMenu={false}
                iconName="person-outline"
              />
            ), // Ícone de usuário
          }}
        />
        {/* Tela Home - Ícone de comanda */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            header: () => (
              <CustomHeader
                title="Comandas"
                showMenu={true}
                navigation={navigation}
                iconName="document-text-outline"
              />
            ), // Ícone de comanda
          })}
        />
        {/* Tela Product - Sem ícone */}
        <Stack.Screen
          name="Product"
          component={ProductScreen}
          options={({ navigation }) => ({
            header: () => (
              <CustomHeader
                title="Produtos/Lançamentos"
                showMenu={true}
                navigation={navigation}
                showBackButton={true} // Sem ícone adicional
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
