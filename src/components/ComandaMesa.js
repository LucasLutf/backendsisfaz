import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const { width, height } = Dimensions.get("window");

const ComandaMesa = ({ products, productsInOrder, setProductsInOrder }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [productSelected, setProductSelected] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [optionalsVisible, setOptionalsVisible] = useState(false);
  const [optionals, setOptionals] = useState([
    { id: 1, name: "Adicional de Carne", price: 6.0, quantity: 0 },
    { id: 2, name: "Adicional de Queijo", price: 3.5, quantity: 0 },
    { id: 3, name: "Adicional de Queijo", price: 3.5, quantity: 0 },
    { id: 4, name: "Adicional de Queijo", price: 3.5, quantity: 0 },
    { id: 5, name: "Adicional de Queijo", price: 3.5, quantity: 0 },
    { id: 6, name: "Adicional de Queijo", price: 3.5, quantity: 0 },
  ]);

  const handleProductPress = (product) => {
    setProductSelected({ ...product, quantity: 1 });
    setModalVisible(true);
    setOptionalsVisible(false);
  };
  const handleCloseModal = () => setModalVisible(false);
  const handleOptionalsPress = () =>
    setOptionalsVisible((prevState) => {
      return !prevState;
    });

  const handleAddToCart = (product) => {
    // Verifica se o produto já está no array de produtos selecionados
    const isProductExistInCart = productsInOrder.some(
      (p) => p.Code === product.Code
    );
    if (isProductExistInCart) {
      // Se o produto já estiver na comanda, atualiza a quantidade
      setProductsInOrder((prevProducts) =>
        prevProducts.map((p) => {
          if (p.Code === product.Code) {
            return { ...p, quantity: p.quantity + product.quantity };
          }
          return p;
        })
      );
    } else {
      // Se o produto não estiver na comanda, adiciona o produto com a quantidade selecionada
      setProductsInOrder((prevProducts) => [...prevProducts, product]);
    }
    setProductSelected(null);
    setModalVisible(false);
  };

  const incrementQuantity = (Code) => {
    setProductSelected((prevProduct) => ({
      ...prevProduct,
      quantity: prevProduct.quantity + 1,
    }));
  };
  const decrementQuantity = (Code) => {
    if (productSelected.quantity > 1) {
      setProductSelected((prevProduct) => ({
        ...prevProduct,
        quantity: prevProduct.quantity - 1,
      }));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.contentArea}>
        <View style={styles.squareContainer}>
          {/* Search input com ícone de pesquisa fora do input */}
          <View style={styles.searchContainer}>
            <TouchableOpacity style={styles.searchIconWrapper}>
              <Icon name="magnify" size={24} color="#5B9A55" />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Pesquisar produtos..."
              placeholderTextColor="#888"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>

          {/* Grid de produtos */}
          <ScrollView style={styles.productContainer}>
            <View style={styles.productGrid}>
              {searchTerm
                ? products
                    .filter((product) =>
                      product.Description.toLowerCase().includes(
                        searchTerm.toLowerCase().trim()
                      )
                    )
                    .map((product, key) => (
                      <TouchableOpacity
                        key={key}
                        onPress={() => handleProductPress(product)} // Adiciona o produto ao array de produtos selecionados
                        style={styles.productSquare}
                      >
                        <Text style={styles.productText}>
                          {product.Description}
                        </Text>
                      </TouchableOpacity>
                    ))
                : products.map((product, key) => (
                    <TouchableOpacity
                      key={key}
                      onPress={() => handleProductPress(product)} // Adiciona o produto ao array de produtos selecionados
                      style={styles.productSquare}
                    >
                      <Text style={styles.productText}>
                        {product.Description}
                      </Text>
                    </TouchableOpacity>
                  ))}
            </View>
          </ScrollView>

          {/* Grupos dentro do container */}
          <View style={styles.groupContainer}>
            <ScrollView
              horizontal
              style={styles.groupScroll}
              showsHorizontalScrollIndicator={false}
            >
              <View style={styles.groupItemContainer}>
                <TouchableOpacity style={styles.groupItem}>
                  <Icon name="glass-cocktail" size={30} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.groupText}>Drinks</Text>
              </View>

              <View style={styles.groupItemContainer}>
                <TouchableOpacity style={styles.groupItem}>
                  <Icon name="glass-mug" size={30} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.groupText}>Sucos</Text>
              </View>

              <View style={styles.groupItemContainer}>
                <TouchableOpacity style={styles.groupItem}>
                  <Icon name="bottle-soda" size={30} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.groupText}>Refri</Text>
              </View>

              <View style={styles.groupItemContainer}>
                <TouchableOpacity style={styles.groupItem}>
                  <Icon name="beer" size={30} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.groupText}>Cervejas</Text>
              </View>

              <View style={styles.groupItemContainer}>
                <TouchableOpacity style={styles.groupItem}>
                  <Icon name="cup-water" size={30} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.groupText}>Água/Café</Text>
              </View>

              <View style={styles.groupItemContainer}>
                <TouchableOpacity style={styles.groupItem}>
                  <Icon name="ice-cream" size={30} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.groupText}>Sorvetes</Text>
              </View>
            </ScrollView>
          </View>
        </View>

        {/* Modal para o produto selecionado */}
        {productSelected && (
          <Modal
            animationType="none"
            transparent={true}
            visible={modalVisible}
            onRequestClose={handleCloseModal}
          >
            <TouchableWithoutFeedback onPress={handleCloseModal}>
              <View style={styles.modalOverlay}>
                <TouchableWithoutFeedback onPress={() => {}}>
                  <View style={[styles.modalContainer, { top: "10%" }]}>
                    <Text style={styles.modalTitle}>
                      {productSelected.Description}
                    </Text>
                    <Text style={styles.modalPrice}>
                      R$ {productSelected.Price.toFixed(2)}
                    </Text>

                    {/* Controle de quantidade */}
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity
                        onPress={decrementQuantity}
                        style={styles.quantitysubButton}
                      >
                        <Text style={styles.quantitysubText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.quantityNumber}>
                        {productSelected.quantity}
                      </Text>
                      <TouchableOpacity
                        onPress={incrementQuantity}
                        style={styles.quantityButton}
                      >
                        <Text style={styles.quantityText}>+</Text>
                      </TouchableOpacity>
                    </View>

                    <Text style={styles.totalText}>
                      Total: R${" "}
                      {productSelected.quantity * productSelected.Price}
                    </Text>

                    {/* Opcionais */}
                    {optionalsVisible && (
                      <ScrollView style={styles.optionalsContainer}>
                        <View style={styles.optionalsContainer}>
                          <Text style={styles.optionalsTitle}>Opcionais</Text>
                          {optionals.map((optional) => (
                            <TouchableWithoutFeedback key={optional.id}>
                              <View style={styles.optionalRow}>
                                <Text style={styles.optionalName}>
                                  {optional.name}
                                </Text>
                                <Text style={styles.optionalPrice}>
                                  R$ {optional.price.toFixed(2)}
                                </Text>
                                <View style={styles.quantityContainer}>
                                  <TouchableOpacity
                                    onPress={() =>
                                      decrementOptional(optional.id)
                                    }
                                    style={styles.quantitysubButton}
                                  >
                                    <Text style={styles.quantityText}>-</Text>
                                  </TouchableOpacity>
                                  <Text style={styles.quantityNumber}>
                                    {optional.quantity}
                                  </Text>
                                  <TouchableOpacity
                                    onPress={() =>
                                      incrementOptional(optional.id)
                                    }
                                    style={styles.quantityButton}
                                  >
                                    <Text style={styles.quantityText}>+</Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            </TouchableWithoutFeedback>
                          ))}
                        </View>
                      </ScrollView>
                    )}

                    {/* Botões */}
                    <View style={styles.buttonRow}>
                      <TouchableOpacity
                        onPress={handleOptionalsPress}
                        style={styles.optionalsButton}
                      >
                        <Text style={styles.optionalsButtonText}>
                          Opcionais
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleAddToCart(productSelected)}
                        style={styles.addButton}
                      >
                        <Text style={styles.addButtonText}>Adicionar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // ícone à esquerda e input à direita
    marginVertical: 8,
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: 16,
  },
  searchIconWrapper: {
    backgroundColor: "#fff",
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 5,
    fontSize: 16,
    width: "85%", // Ajustado para ocupar o espaço à direita
  },
  contentArea: {
    flex: 1,
    paddingHorizontal: 10, // Ajustado para melhor espaçamento
    paddingVertical: 10,
    backgroundColor: "#f5f5f5", // Fundo para melhor visualização
  },
  productContainer: {
    flex: 1,
    marginTop: 10,
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productSquare: {
    backgroundColor: "#5B9A55",
    width: width / 4.5 - 15,
    height: width / 4.5 - 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  productText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
  },
  groupContainer: {
    paddingVertical: 10,
    borderTopWidth: 2,
    borderTopColor: "#00000020",
    marginTop: 10,
  },
  groupScroll: {
    paddingVertical: 5,
  },
  groupItemContainer: {
    alignItems: "center",
    width: 70, // Aumentado para melhor acomodar o texto
    marginHorizontal: 5,
  },
  groupItem: {
    width: 57,
    height: 60,
    backgroundColor: "#5B9A55",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 5,
  },
  groupText: {
    color: "#000",
    textAlign: "center",
    fontSize: 12,
    marginTop: 5,
    width: "100%",
    flexWrap: "wrap",
  },
  squareContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  modalOverlay: {
    flexGrow: 1,
    justifyContent: "flex-end",
    marginBottom: 90, // Ajustado para melhor visualização
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "100%", // Definir uma largura menor para o modal
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 10, // Reduzir o padding horizontal
    paddingVertical: 15, // Reduzir o padding vertical
    alignItems: "center",
    justifyContent: "flex-start", // Garantir que os elementos fiquem compactos no topo
  },

  modalTitle: {
    fontSize: 16, // Reduzir o tamanho do texto do título
    fontWeight: "bold",
    marginBottom: 5, // Diminuir a margem inferior
  },
  modalPrice: {
    fontSize: 14, // Reduzir o tamanho do preço
    marginBottom: 5, // Diminuir o espaçamento inferior
    color: "#333",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5, // Diminuir a distância entre o seletor de quantidade e o total
  },
  quantityButton: {
    backgroundColor: "#5B9A55",
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  quantitysubButton: {
    backgroundColor: "#FF6347",
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  quantitysubText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  quantityNumber: {
    marginHorizontal: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  totalText: {
    fontSize: 14, // Reduzir o tamanho do texto total
    fontWeight: "bold",
    marginBottom: 10, // Reduzir a margem inferior
    color: "#333",
  },
  optionalsContainer: {
    width: "100%",
  },
  optionalsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  optionalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5, // Garantir um espaçamento melhor entre os itens
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  optionalName: {
    fontSize: 14, // Diminuir a fonte do nome do opcional
  },
  optionalPrice: {
    fontSize: 14,
    color: "#333",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  optionalsButton: {
    backgroundColor: "#5B9A55",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  optionalsButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#5B9A55",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  optionalsContainer: {
    width: "100%",
    borderTopWidth: 1,
    borderColor: "#ddd",
    height: "40%", // Ajustar a altura do container
  },
});

export default ComandaMesa;
