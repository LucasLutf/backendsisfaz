import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Importando o gradiente
import { Ionicons } from "@expo/vector-icons"; // Importando os ícones
import { OrdersDatabase } from "../storage/OrdersDatabase";
import { HeaderContext } from "../components/HeaderContext";

const HomeScreen = ({ route, navigation }) => {
  const [comanda, setComanda] = useState("");
  const { resetMenuHeader } = useContext(HeaderContext);

  const user = route.params;

  const handleCreateComanda = async () => {
    if (isNaN(comanda) || comanda.trim() === "") {
      return alert("Por favor, insira um número válido para a comanda.");
    }
    const order = await OrdersDatabase().getOrderByCode(comanda);

    if (order) {
      // Se a comanda já existe, navegue para a tela de produtos com a comanda existente
      setComanda("");
      navigation.navigate("Product", { order, user });
    } else {
      alert("Comanda inexistente");
    }
  };

  const handleEnter = () => {
    console.log("Ícone de entrar clicado");
    // Aqui você pode adicionar qualquer ação desejada ao clicar no ícone
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        resetMenuHeader();
      }}
    >
      <LinearGradient
        colors={["rgb(91, 154, 85)", "rgba(0, 0, 0, 0.84)"]} // Gradiente igual da tela de login
        style={styles.gradient}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>Comanda</Text>

          <View style={styles.inputWithIconContainer}>
            <View style={styles.inputContainer}>
              <Ionicons
                name="search-outline"
                size={24}
                color="#888"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Digite o número da comanda"
                placeholderTextColor="#888"
                value={comanda}
                onChangeText={setComanda}
                keyboardType="numeric" // Exibe teclado numérico em Android e iOS
              />
            </View>

            <TouchableOpacity style={styles.iconButton} onPress={handleEnter}>
              <Ionicons name="enter-outline" size={24} color="#5B9A55" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleCreateComanda}>
            <Text style={styles.buttonText}>Abrir Comanda</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 8,
    fontWeight: "bold",
    alignSelf: "flex-start",
    paddingLeft: 50,
  },
  inputWithIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%", // Mesma largura do botão
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    height: 50,
    flex: 1, // O input ocupará o restante do espaço
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
  },
  iconButton: {
    marginLeft: 10,
    backgroundColor: "#fff",
    borderRadius: 25, // Forma de círculo
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HomeScreen;
