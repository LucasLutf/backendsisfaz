import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Conta = ({ navigation }) => {
  const [items, setItems] = useState([
    { id: 1, name: 'Coca Cola', quantity: 1, total: 12.00 },
    { id: 2, name: 'Água com Gás', quantity: 1, total: 6.50 },
  ]);

  return (
    <View style={styles.contentArea}>
      {/* Linha de Total e Botão de Imprimir Conta */}
      <View style={styles.totalRow}>
        <Text style={styles.totalText}>Total: R$ 18,50</Text>
        <TouchableOpacity style={styles.printButton}>
          <Icon name="printer" size={20} color="#fff" />
          <Text style={styles.printText}>Imprimir Conta</Text>
        </TouchableOpacity>
      </View>

      {/* Divider entre Total e Tabela */}
      <View style={styles.divider} />

      {/* Cabeçalho da Tabela */}
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Qtde.</Text>
        <Text style={styles.headerText}>Nome</Text>
        <Text style={styles.headerText}>Total</Text>
      </View>

      {/* Tabela de Itens */}
      <ScrollView style={styles.tableContainer}>
        {items.map(item => (
          <View key={item.id} style={styles.tableRow}>
            <Text style={styles.itemQuantity}>{item.quantity}</Text>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemTotal}>R$ {item.total.toFixed(2)}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  contentArea: {
    flex: 1,
    padding: 16,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  printButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5A9A55',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  printText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#cccccc',
    marginVertical: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#555',
    flex: 1,
    textAlign: 'center',
  },
  tableContainer: {
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemQuantity: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
  itemName: {
    flex: 2,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
  itemTotal: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
});

export default Conta;
