import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ConfirmarFechamento = ({ productsInOrder, setProductsInOrder }) => {
  console.log(productsInOrder);

  const sumTotalOrder = () => {
    return productsInOrder.reduce(
      (total, product) => total + product.quantity * product.Price,
      0
    );
  };

  const handleIncrement = (productId) => {
    setProductsInOrder(
      productsInOrder.map((product) =>
        product.Code === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [adicionais, setAdicionais] = useState([
    { id: 1, name: "Copo", quantity: 1 },
    { id: 2, name: "Prato", quantity: 1 },
    { id: 3, name: "Talher", quantity: 1 },
    { id: 4, name: "Talher", quantity: 1 },
    { id: 5, name: "Talher", quantity: 1 },
    { id: 6, name: "Talher", quantity: 1 },
    { id: 7, name: "Talher", quantity: 1 },
    { id: 8, name: "Talher", quantity: 1 },
    { id: 9, name: "Talher", quantity: 1 },
    { id: 10, name: "Talher", quantity: 1 },
    { id: 11, name: "Talher", quantity: 1 },
    { id: 12, name: "Talher", quantity: 1 },
    { id: 13, name: "Talher", quantity: 1 },
    { id: 14, name: "Talher", quantity: 1 },
  ]);

  const handleDecrement = (productId) => {
    productsInOrder.find(
      (product) => product.Code === productId && product.quantity === 1
    )
      ? handleRemove(productId)
      : setProductsInOrder(
          productsInOrder.map((product) =>
            product.Code === productId && product.quantity > 1
              ? { ...product, quantity: product.quantity - 1 }
              : product
          )
        );
  };

  const handleRemove = (productId) => {
    setProductsInOrder(
      productsInOrder.filter((product) => product.Code !== productId)
    );
  };

  const handleAdicionalIncrement = (adicionalId) => {
    setAdicionais(
      adicionais.map((adicional) =>
        adicional.id === adicionalId
          ? { ...adicional, quantity: adicional.quantity + 1 }
          : adicional
      )
    );
  };

  const handleAdicionalDecrement = (adicionalId) => {
    setAdicionais(
      adicionais.map((adicional) =>
        adicional.id === adicionalId && adicional.quantity > 0
          ? { ...adicional, quantity: adicional.quantity - 1 }
          : adicional
      )
    );
  };

  return (
    <View style={styles.contentArea}>
      {/* Modal de Adicionais */}
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          {/* O TouchableWithoutFeedback captura o toque fora do modal */}
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalDismissArea} />
          </TouchableWithoutFeedback>

          {/* Conteúdo do modal */}
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Adicionais</Text>

            {/* ScrollView para garantir o scroll nos adicionais */}
            <ScrollView style={styles.adicionaisList}>
              {adicionais.map((adicional) => (
                <View key={adicional.id} style={styles.tableRow}>
                  <Text style={styles.productName}>{adicional.name}</Text>
                  <View style={styles.quantityControl}>
                    <TouchableOpacity
                      style={styles.decrementButton}
                      onPress={() => handleAdicionalDecrement(adicional.Code)}
                    >
                      <Text style={styles.controlText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>
                      {adicional.quantity}
                    </Text>
                    <TouchableOpacity
                      style={styles.incrementButton}
                      onPress={() => handleAdicionalIncrement(adicional.Code)}
                    >
                      <Text style={styles.controlText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeModalText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Linha de Total e Botões */}
      <View style={styles.totalRow}>
        <Text style={styles.totalText}>Total: R$ {sumTotalOrder().toFixed(2)}</Text>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.adicionaisButton}
            onPress={() => setModalVisible(true)}
          >
            <Icon name="plus" size={15} color="#fff" />
            <Text style={styles.adicionaisText}>Adicionais</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sendButton}>
            <Icon name="send" size={15} color="#fff" />
            <Text style={styles.sendText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Divider entre Total e Tabela */}
      <View style={styles.divider} />

      {/* Cabeçalho da Tabela */}
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Qtde.</Text>
        <Text style={styles.headerText}>Nome</Text>
        <Text style={styles.headerText}>Apagar</Text>
      </View>

      {/* Tabela de Produtos */}
      {productsInOrder ? (
      <ScrollView style={styles.tableContainer}>
        {productsInOrder.map((product, key) => (
          <View key={key} style={styles.tableRow}>
            <View style={styles.quantityControl}>
              <TouchableOpacity
                style={styles.decrementButton}
                onPress={() => handleDecrement(product.Code)}
              >
                <Text style={styles.controlText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{product.quantity}</Text>
              <TouchableOpacity
                style={styles.incrementButton}
                onPress={() => handleIncrement(product.Code)}
              >
                <Text style={styles.controlText}>+</Text>
              </TouchableOpacity>
            </View>

            {/* Nome Centralizado */}
            <Text style={styles.productName}>{product.Description}</Text>

            {/* Ícone de Lixeira Distanciado da Borda */}
            <TouchableOpacity
              style={styles.trashIcon}
              onPress={() => handleRemove(product.Code)}
            >
              <Icon name="trash-can-outline" size={24} color="#888" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      ) : (
      <View>
        <Text>Nenhum produto adicionado</Text>
      </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contentArea: {
    flex: 1,
    padding: 16,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  totalText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    paddingRight: 10,
  },
  buttonGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  sendButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5A9A55",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 10,
  },
  sendText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 14,
  },
  adicionaisButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5A9A55", // Cor ajustada
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  adicionaisText: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: "#cccccc",
    marginVertical: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#555",
    flex: 1,
    textAlign: "center",
  },
  tableContainer: {
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  decrementButton: {
    backgroundColor: "#FF6347",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  incrementButton: {
    backgroundColor: "#5A9A55",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  controlText: {
    color: "#fff",
    fontSize: 18,
  },
  quantityText: {
    fontSize: 16,
    color: "#333",
  },
  productName: {
    flex: 2,
    textAlign: "center",
    fontSize: 16,
    color: "#333",
    marginLeft: "20%",
  },
  trashIcon: {
    paddingRight: 25,
    flex: 1,
    alignItems: "flex-end",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  closeModalButton: {
    backgroundColor: "#5A9A55",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  closeModalText: {
    color: "#fff",
    fontSize: 16,
  },
  scrollContainer: {
    maxHeight: 200, // Defina a altura máxima do ScrollView
    width: "100%",
  },
  modalDismissArea: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  adicionaisList: {
    maxHeight: 250, // Ajuste a altura conforme necessário
    width: "100%",
  },
});

export default ConfirmarFechamento;
