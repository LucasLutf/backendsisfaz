import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Menu, Provider } from "react-native-paper";
import { HeaderContext } from "./HeaderContext";
import { DataConnection } from "../storage/DataConnection";

const updateConnection = () => {
  DataConnection().updateDataConnection({
    Hostname: "192.168.1.61",
    Port: "3001",
  });
};

const CustomHeader = ({
  title,
  onLogoutPress,
  showMenu = true,
  navigation,
  showBackButton = false,
  iconName = null,
}) => {
  const { isMenuHeader, handleMenuHeader, resetMenuHeader } =
    useContext(HeaderContext);

  return (
    <Provider>
      {/* Ao clicar fora do menu, ele será fechado */}
      <TouchableWithoutFeedback onPress={resetMenuHeader}>
        <View style={{ flex: 1 }}>
          <StatusBar
            barStyle={
              Platform.OS === "android" ? "light-content" : "dark-content"
            }
            backgroundColor="#3D3434"
          />
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerContainer}>
              <View style={styles.leftContainer}>
                {/* Botão de voltar */}
                {showBackButton && (
                  <>
                    <TouchableOpacity
                      onPress={() => navigation.goBack()}
                      style={styles.backButton}
                    >
                      <Ionicons
                        name="arrow-back-outline"
                        size={24}
                        color="#fff"
                      />
                    </TouchableOpacity>
                    <View style={styles.divider} />
                  </>
                )}
                {/* Ícone dinâmico com base na tela */}
                {iconName && (
                  <>
                    <Ionicons
                      name={iconName}
                      size={24}
                      color="#fff"
                      style={styles.icon}
                    />
                    <View style={styles.divider} />
                  </>
                )}
                <Text style={styles.title}>{title}</Text>
              </View>

              {/* Menu de configurações */}
              {!showMenu && (
                <Menu
                  visible={isMenuHeader}
                  onDismiss={resetMenuHeader} // Fecha o menu ao clicar fora dele ou ao abrir o menu novamente
                  anchor={
                    <TouchableOpacity onPress={handleMenuHeader}>
                      <Ionicons
                        name="ellipsis-vertical"
                        size={24}
                        color="#fff"
                      />
                    </TouchableOpacity>
                  }
                >
                  {/* Botão de configurar a conexão com banco */}
                  <Menu.Item onPress={updateConnection} title="Configurar" />
                </Menu>
              )}

              {/* Menu de opções */}
              {showMenu && (
                <Menu
                  visible={isMenuHeader}
                  onDismiss={resetMenuHeader} // Fecha o menu ao clicar fora dele ou ao abrir o menu novamente
                  anchor={
                    <TouchableOpacity onPress={handleMenuHeader}>
                      <Ionicons
                        name="ellipsis-vertical"
                        size={24}
                        color="#fff"
                      />
                    </TouchableOpacity>
                  }
                >
                  <Menu.Item onPress={onLogoutPress} title="Sair" />
                  {/* Botão de fechar (ícone "X") */}
                  <Menu.Item
                    onPress={resetMenuHeader}
                    title="Fechar"
                    icon={() => (
                      <Ionicons name="close" size={20} color="#000" />
                    )}
                  />
                </Menu>
              )}
            </View>
          </SafeAreaView>
        </View>
      </TouchableWithoutFeedback>
    </Provider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 0,
    backgroundColor: "#3D3434",
  },
  headerContainer: {
    height: 50,
    backgroundColor: "#3D3434",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 10,
  },
  divider: {
    width: 1,
    height: "70%",
    backgroundColor: "#fff",
    marginHorizontal: 10,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 8,
  },
  icon: {
    marginRight: 5,
  },
});

export default CustomHeader;
